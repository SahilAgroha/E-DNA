package com.sahil.edna.service;

import com.sahil.edna.dto.*;
import com.sahil.edna.entity.*;
import com.sahil.edna.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MicrobiomeDataService {

    private final MicrobiomeAnalysisRepository analysisRepository;
    private final SampleDataRepository sampleDataRepository;
    private final BetaDiversityComparisonRepository betaDiversityComparisonRepository;
    private final TaxonomicPredictionRepository taxonomicPredictionRepository;
    private final NovelCandidateRepository novelCandidateRepository;
    private final AbundanceDataRepository abundanceDataRepository;
    private final AlphaDiversityDataRepository alphaDiversityDataRepository;

    public MicrobiomeDataService(MicrobiomeAnalysisRepository analysisRepository,
                                 SampleDataRepository sampleDataRepository,
                                 BetaDiversityComparisonRepository betaDiversityComparisonRepository,
                                 TaxonomicPredictionRepository taxonomicPredictionRepository,
                                 NovelCandidateRepository novelCandidateRepository,
                                 AbundanceDataRepository abundanceDataRepository,
                                 AlphaDiversityDataRepository alphaDiversityDataRepository) {
        this.analysisRepository = analysisRepository;
        this.sampleDataRepository = sampleDataRepository;
        this.betaDiversityComparisonRepository = betaDiversityComparisonRepository;
        this.taxonomicPredictionRepository = taxonomicPredictionRepository;
        this.novelCandidateRepository = novelCandidateRepository;
        this.abundanceDataRepository = abundanceDataRepository;
        this.alphaDiversityDataRepository = alphaDiversityDataRepository;
    }

    /**
     * Saves the entire microbiome analysis report from a DTO to the database.
     */
    @Transactional
    public MicrobiomeAnalysis saveMicrobiomeData(MicrobiomeDataDTO data) {
        // 1. Create and save the main MicrobiomeAnalysis entity and its KingdomDistribution children
        MicrobiomeAnalysis analysis = new MicrobiomeAnalysis();
        OverviewDTO overview = data.getOverview();
        AverageAlphaDiversityDTO avgAlpha = overview.getAverageAlphaDiversity();

        analysis.setTotalSamplesProcessed(overview.getTotalSamplesProcessed());
        analysis.setTotalSequences(overview.getTotalSequences());
        analysis.setTotalTaxaIdentified(overview.getTotalTaxaIdentified());
        analysis.setTotalNovelCandidates(overview.getTotalNovelCandidates());
        analysis.setAvgShannon(avgAlpha.getAvgShannon());
        analysis.setAvgRichness(avgAlpha.getAvgRichness());
        analysis.setAvgEvenness(avgAlpha.getAvgEvenness());

        List<KingdomDistribution> kingdomDistributions = overview.getKingdomDistribution().entrySet().stream()
                .map(entry -> {
                    KingdomDistribution kd = new KingdomDistribution();
                    kd.setKingdomName(entry.getKey());
                    kd.setCount(entry.getValue());
                    kd.setAnalysis(analysis);
                    return kd;
                }).collect(Collectors.toList());
        analysis.setKingdomDistribution(kingdomDistributions);

        // This will save MicrobiomeAnalysis and cascade to KingdomDistribution
        MicrobiomeAnalysis savedAnalysis = analysisRepository.save(analysis);

        // 2. Process and save each sample along with its children
        Map<String, SampleData> sampleMap = data.getTaxonomicPredictions().keySet().stream()
                .map(sampleId -> {
                    SampleData sample = new SampleData();
                    sample.setSampleId(sampleId);
                    sample.setAnalysis(savedAnalysis);

                    SampleSummaryDiversityDTO summaryDiv = data.getDiversityData().getSampleSummary().get(sampleId);
                    if (summaryDiv != null) {
                        sample.setDominantKingdom(summaryDiv.getDominantKingdom());
                        sample.setRareTaxaCount(summaryDiv.getRareTaxaCount());
                        sample.setTotalSequences(summaryDiv.getTotalSequences());
                    }

                    // Save the SampleData entity to get a valid ID before saving children
                    SampleData savedSample = sampleDataRepository.save(sample);

                    // Map and save child entities, linking them to the persisted parent
                    List<TaxonomicPrediction> predictions = data.getTaxonomicPredictions().get(sampleId).stream()
                            .map(predDto -> mapToTaxonomicPredictionEntity(predDto, savedSample))
                            .collect(Collectors.toList());
                    savedSample.setTaxonomicPredictions(predictions); // Link back for consistency
                    taxonomicPredictionRepository.saveAll(predictions);

                    List<NovelCandidate> novelCandidates = data.getNovelCandidates().getOrDefault(sampleId, List.of()).stream()
                            .map(candidateDto -> mapToNovelCandidateEntity(candidateDto, savedSample))
                            .collect(Collectors.toList());
                    savedSample.setNovelCandidates(novelCandidates);
                    novelCandidateRepository.saveAll(novelCandidates);

                    List<AbundanceData> abundanceList = mapToAbundanceDataEntities(data.getAbundanceData(), sampleId, savedSample);
                    savedSample.setAbundanceData(abundanceList);
                    abundanceDataRepository.saveAll(abundanceList);

                    List<AlphaDiversityData> alphaList = mapToAlphaDiversityEntities(data.getDiversityData().getAlphaDiversity(), sampleId, savedSample);
                    savedSample.setAlphaDiversityData(alphaList);
                    alphaDiversityDataRepository.saveAll(alphaList);

                    return savedSample;
                }).collect(Collectors.toMap(SampleData::getSampleId, s -> s));


        // 3. Process and save Beta Diversity Data separately due to two-way relationship
        data.getDiversityData().getBetaDiversity().forEach((comparisonName, betaData) -> {
            String[] parts = comparisonName.split("_vs_");
            if (parts.length == 2) {
                SampleData sample1 = sampleMap.get(parts[0]);
                SampleData sample2 = sampleMap.get(parts[1]);

                if (sample1 != null && sample2 != null) {
                    BetaDiversityComparison betaComparison = new BetaDiversityComparison();
                    betaComparison.setComparisonName(comparisonName);
                    betaComparison.setJaccardSimilarity(betaData.getJaccardSimilarity());
                    betaComparison.setJaccardDistance(betaData.getJaccardDistance());
                    betaComparison.setSharedSpecies(betaData.getSharedSpecies());
                    betaComparison.setTotalUniqueSpecies(betaData.getTotalUniqueSpecies());
                    betaComparison.setSampleData1(sample1);
                    betaComparison.setSampleData2(sample2);
                    betaDiversityComparisonRepository.save(betaComparison);
                }
            }
        });

        // Refresh the saved analysis to get all cascaded children loaded
        return analysisRepository.findById(savedAnalysis.getId()).get();
    }

    /**
     * Retrieves the complete microbiome analysis report by ID and maps it back to a DTO.
     */
    @Transactional(readOnly = true)
    public MicrobiomeDataDTO getMicrobiomeData(Long analysisId) {
        MicrobiomeAnalysis analysis = analysisRepository.findById(analysisId)
                .orElseThrow(() -> new RuntimeException("Analysis not found with ID: " + analysisId));

        MicrobiomeDataDTO retrievalDTO = new MicrobiomeDataDTO();

        // Map Overview
        retrievalDTO.setOverview(mapToOverviewDTO(analysis));

        // Eagerly load all samples to avoid lazy-loading issues in mapping
        List<SampleData> allSamples = analysis.getSamples();
        Map<String, SampleData> sampleDataMap = allSamples.stream()
                .collect(Collectors.toMap(SampleData::getSampleId, s -> s));

        // Map Taxonomic Predictions and Novel Candidates
        retrievalDTO.setTaxonomicPredictions(sampleDataMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().getTaxonomicPredictions().stream()
                                .map(this::mapToTaxonomicPredictionDTO)
                                .collect(Collectors.toList())
                )));

        retrievalDTO.setNovelCandidates(sampleDataMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().getNovelCandidates().stream()
                                .map(this::mapToNovelCandidateDTO)
                                .collect(Collectors.toList())
                )));

        // Map Abundance Data
        retrievalDTO.setAbundanceData(mapToAbundanceDataDTO(sampleDataMap));

        // Map Diversity Data
        retrievalDTO.setDiversityData(mapToDiversityDataDTO(sampleDataMap, allSamples));

        return retrievalDTO;
    }

    // --- Private mapping methods (DTOs to Entities) ---
    private TaxonomicPrediction mapToTaxonomicPredictionEntity(TaxonomicPredictionDTO dto, SampleData sample) {
        TaxonomicPrediction entity = new TaxonomicPrediction();
        entity.setSequenceId(dto.getSequenceId());
        entity.setKingdom(dto.getKingdom());
        entity.setPhylum(dto.getPhylum());
        entity.setClazz(dto.getClazz());
        entity.setGenus(dto.getGenus());
        entity.setSpecies(dto.getSpecies());
        entity.setSequenceCount(dto.getSequenceCount());
        entity.setKingdomConfidence(dto.getKingdomConfidence());
        entity.setPhylumConfidence(dto.getPhylumConfidence());
        entity.setClassConfidence(dto.getClassConfidence());
        entity.setGenusConfidence(dto.getGenusConfidence());
        entity.setSpeciesConfidence(dto.getSpeciesConfidence());
        entity.setOverallConfidence(dto.getOverallConfidence());
        entity.setNovelCandidate(dto.getNovelCandidate());
        entity.setSampleData(sample);
        return entity;
    }

    private NovelCandidate mapToNovelCandidateEntity(NovelCandidateDTO dto, SampleData sample) {
        NovelCandidate entity = new NovelCandidate();
        entity.setClusterId(dto.getClusterId());
        entity.setSequenceCount(dto.getSequenceCount());
        entity.setOverallConfidence(dto.getOverallConfidence());
        entity.setClosestKnownTaxa(dto.getClosestKnownTaxa());
        entity.setGeneticDistance(dto.getGeneticDistance());
        entity.setPredictedKingdom(dto.getPredictedKingdom());
        entity.setPredictedPhylum(dto.getPredictedPhylum());
        entity.setKingdomConfidence(dto.getKingdomConfidence());
        entity.setPhylumConfidence(dto.getPhylumConfidence());
        entity.setSampleData(sample);
        return entity;
    }

    private List<AbundanceData> mapToAbundanceDataEntities(AbundanceDataDTO dto, String sampleId, SampleData sample) {
        List<AbundanceData> list = new java.util.ArrayList<>();
        dto.getKingdomLevel().getOrDefault(sampleId, Map.of()).forEach((taxon, count) -> list.add(createAbundanceData(sample, "kingdom", taxon, count)));
        dto.getPhylumLevel().getOrDefault(sampleId, Map.of()).forEach((taxon, count) -> list.add(createAbundanceData(sample, "phylum", taxon, count)));
        dto.getGenusLevel().getOrDefault(sampleId, Map.of()).forEach((taxon, count) -> list.add(createAbundanceData(sample, "genus", taxon, count)));
        dto.getSpeciesLevel().getOrDefault(sampleId, Map.of()).forEach((taxon, count) -> list.add(createAbundanceData(sample, "species", taxon, count)));
        return list;
    }

    private AbundanceData createAbundanceData(SampleData sample, String level, String taxon, int count) {
        AbundanceData abd = new AbundanceData();
        abd.setLevel(level);
        abd.setTaxonName(taxon);
        abd.setCount(count);
        abd.setSampleData(sample);
        return abd;
    }

    private List<AlphaDiversityData> mapToAlphaDiversityEntities(AlphaDiversityDTO dto, String sampleId, SampleData sample) {
        List<AlphaDiversityData> list = new java.util.ArrayList<>();
        if (dto.getSpeciesRichness().containsKey(sampleId)) {
            list.add(createAlphaDiversityData(sample, "species_richness", dto.getSpeciesRichness().get(sampleId).doubleValue()));
        }
        if (dto.getShannonDiversity().containsKey(sampleId)) {
            list.add(createAlphaDiversityData(sample, "shannon_diversity", dto.getShannonDiversity().get(sampleId)));
        }
        if (dto.getSimpsonDiversity().containsKey(sampleId)) {
            list.add(createAlphaDiversityData(sample, "simpson_diversity", dto.getSimpsonDiversity().get(sampleId)));
        }
        if (dto.getEvenness().containsKey(sampleId)) {
            list.add(createAlphaDiversityData(sample, "evenness", dto.getEvenness().get(sampleId)));
        }
        return list;
    }

    private AlphaDiversityData createAlphaDiversityData(SampleData sample, String metric, double value) {
        AlphaDiversityData alphaData = new AlphaDiversityData();
        alphaData.setMetric(metric);
        alphaData.setValue(value);
        alphaData.setSampleData(sample);
        return alphaData;
    }

    // --- Private mapping methods (Entities to DTOs) ---
    private OverviewDTO mapToOverviewDTO(MicrobiomeAnalysis analysis) {
        OverviewDTO overviewDTO = new OverviewDTO();
        overviewDTO.setId(analysis.getId());
        overviewDTO.setTotalSamplesProcessed(analysis.getTotalSamplesProcessed());
        overviewDTO.setTotalSequences(analysis.getTotalSequences());
        overviewDTO.setTotalTaxaIdentified(analysis.getTotalTaxaIdentified());
        overviewDTO.setTotalNovelCandidates(analysis.getTotalNovelCandidates());

        AverageAlphaDiversityDTO avgAlphaDTO = new AverageAlphaDiversityDTO();
        avgAlphaDTO.setAvgShannon(analysis.getAvgShannon());
        avgAlphaDTO.setAvgRichness(analysis.getAvgRichness());
        avgAlphaDTO.setAvgEvenness(analysis.getAvgEvenness());
        overviewDTO.setAverageAlphaDiversity(avgAlphaDTO);

        Map<String, Integer> kingdomDistribution = analysis.getKingdomDistribution().stream()
                .collect(Collectors.toMap(KingdomDistribution::getKingdomName, KingdomDistribution::getCount));
        overviewDTO.setKingdomDistribution(kingdomDistribution);

        return overviewDTO;
    }

    private TaxonomicPredictionDTO mapToTaxonomicPredictionDTO(TaxonomicPrediction entity) {
        TaxonomicPredictionDTO dto = new TaxonomicPredictionDTO();
        dto.setSequenceId(entity.getSequenceId());
        dto.setKingdom(entity.getKingdom());
        dto.setPhylum(entity.getPhylum());
        dto.setClazz(entity.getClazz());
        dto.setGenus(entity.getGenus());
        dto.setSpecies(entity.getSpecies());
        dto.setSequenceCount(entity.getSequenceCount());
        dto.setKingdomConfidence(entity.getKingdomConfidence());
        dto.setPhylumConfidence(entity.getPhylumConfidence());
        dto.setClassConfidence(entity.getClassConfidence());
        dto.setGenusConfidence(entity.getGenusConfidence());
        dto.setSpeciesConfidence(entity.getSpeciesConfidence());
        dto.setOverallConfidence(entity.getOverallConfidence());
        dto.setNovelCandidate(entity.getNovelCandidate());
        return dto;
    }

    private NovelCandidateDTO mapToNovelCandidateDTO(NovelCandidate entity) {
        NovelCandidateDTO dto = new NovelCandidateDTO();
        dto.setClusterId(entity.getClusterId());
        // dto.setSampleId(entity.getSampleData().getSampleId()); // Note: this is not needed in a Retrieval DTO if the DTO is already nested under a sample key
        dto.setSequenceCount(entity.getSequenceCount());
        dto.setOverallConfidence(entity.getOverallConfidence());
        dto.setClosestKnownTaxa(entity.getClosestKnownTaxa());
        dto.setGeneticDistance(entity.getGeneticDistance());
        dto.setPredictedKingdom(entity.getPredictedKingdom());
        dto.setPredictedPhylum(entity.getPredictedPhylum());
        dto.setKingdomConfidence(entity.getKingdomConfidence());
        dto.setPhylumConfidence(entity.getPhylumConfidence());
        return dto;
    }

    private AbundanceDataDTO mapToAbundanceDataDTO(Map<String, SampleData> sampleDataMap) {
        AbundanceDataDTO dto = new AbundanceDataDTO();
        dto.setKingdomLevel(createAbundanceLevelMap(sampleDataMap, "kingdom"));
        dto.setPhylumLevel(createAbundanceLevelMap(sampleDataMap, "phylum"));
        dto.setGenusLevel(createAbundanceLevelMap(sampleDataMap, "genus"));
        dto.setSpeciesLevel(createAbundanceLevelMap(sampleDataMap, "species"));

        Map<String, SampleSummaryAbundanceDTO> summaryMap = sampleDataMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            SampleSummaryAbundanceDTO summary = new SampleSummaryAbundanceDTO();
                            // Assuming you can get this data from somewhere, maybe the sampleData entity itself
                            // For now, let's just create a blank summary DTO
                            return summary;
                        }
                ));
        dto.setSummary(summaryMap);
        return dto;
    }

    private Map<String, Map<String, Integer>> createAbundanceLevelMap(Map<String, SampleData> sampleDataMap, String level) {
        return sampleDataMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().getAbundanceData().stream()
                                .filter(abd -> abd.getLevel().equals(level))
                                .collect(Collectors.toMap(AbundanceData::getTaxonName, AbundanceData::getCount))
                ));
    }

    // File: MicrobiomeDataService.java

// ... (existing methods) ...

    private DiversityDataDTO mapToDiversityDataDTO(Map<String, SampleData> sampleDataMap, List<SampleData> allSamples) {
        DiversityDataDTO dto = new DiversityDataDTO();

        AlphaDiversityDTO alphaDTO = new AlphaDiversityDTO();
        alphaDTO.setSpeciesRichness(createIntegerAlphaDiversityMap(allSamples, "species_richness"));
        alphaDTO.setShannonDiversity(createDoubleAlphaDiversityMap(allSamples, "shannon_diversity"));
        alphaDTO.setSimpsonDiversity(createDoubleAlphaDiversityMap(allSamples, "simpson_diversity"));
        alphaDTO.setEvenness(createDoubleAlphaDiversityMap(allSamples, "evenness"));
        dto.setAlphaDiversity(alphaDTO);

        // Corrected code for handling duplicate keys in the map creation
        Map<String, BetaDiversityComparisonDTO> betaMap = betaDiversityComparisonRepository.findAll().stream()
                .collect(Collectors.toMap(
                        BetaDiversityComparison::getComparisonName,
                        this::mapToBetaDiversityDTO,
                        (existingValue, newValue) -> existingValue // Merge function to discard the new value if the key exists
                ));
        dto.setBetaDiversity(betaMap);

        Map<String, SampleSummaryDiversityDTO> summaryMap = sampleDataMap.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> {
                            SampleData sample = entry.getValue();
                            SampleSummaryDiversityDTO summary = new SampleSummaryDiversityDTO();
                            summary.setDominantKingdom(sample.getDominantKingdom());
                            summary.setRareTaxaCount(sample.getRareTaxaCount());
                            summary.setTotalSequences(sample.getTotalSequences());
                            return summary;
                        }
                ));
        dto.setSampleSummary(summaryMap);

        return dto;
    }
    private BetaDiversityComparisonDTO mapToBetaDiversityDTO(BetaDiversityComparison entity) {
        BetaDiversityComparisonDTO dto = new BetaDiversityComparisonDTO();
        dto.setJaccardSimilarity(entity.getJaccardSimilarity());
        dto.setJaccardDistance(entity.getJaccardDistance());
        dto.setSharedSpecies(entity.getSharedSpecies());
        dto.setTotalUniqueSpecies(entity.getTotalUniqueSpecies());
        return dto;
    }

    // Method for Integer-based metrics (species_richness)
    private Map<String, Integer> createIntegerAlphaDiversityMap(List<SampleData> allSamples, String metric) {
        return allSamples.stream()
                .collect(Collectors.toMap(
                        SampleData::getSampleId,
                        sample -> sample.getAlphaDiversityData().stream()
                                .filter(ad -> ad.getMetric().equals(metric))
                                .findFirst()
                                .map(AlphaDiversityData::getValue)
                                .map(Double::intValue) // Convert Double to Integer
                                .orElse(0) // Default value for Integer
                ));
    }

    // Method for Double-based metrics (shannon, simpson, evenness)
    private Map<String, Double> createDoubleAlphaDiversityMap(List<SampleData> allSamples, String metric) {
        return allSamples.stream()
                .collect(Collectors.toMap(
                        SampleData::getSampleId,
                        sample -> sample.getAlphaDiversityData().stream()
                                .filter(ad -> ad.getMetric().equals(metric))
                                .findFirst()
                                .map(AlphaDiversityData::getValue)
                                .orElse(0.0) // Default value if not found
                ));
    }

    @Transactional(readOnly = true)
    public List<OverviewDTO> getAllAnalysesOverview() {
        // Fetch all MicrobiomeAnalysis entities
        List<MicrobiomeAnalysis> allAnalyses = analysisRepository.findAll();

        // Map each entity to its OverviewDTO
        return allAnalyses.stream()
                .map(this::mapToOverviewDTO)
                .collect(Collectors.toList());
    }


}