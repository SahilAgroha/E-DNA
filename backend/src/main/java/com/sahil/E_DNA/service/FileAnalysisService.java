// FileAnalysisService.java
package com.sahil.E_DNA.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sahil.E_DNA.model.DiversityMetric;
import com.sahil.E_DNA.model.FileAnalysis;
import com.sahil.E_DNA.model.NovelCandidate;
import com.sahil.E_DNA.model.TaxonomicPrediction;
import com.sahil.E_DNA.repo.FileAnalysisRepository;
import com.sahil.E_DNA.repo.DiversityMetricRepository;
import com.sahil.E_DNA.repo.NovelCandidateRepository;
import com.sahil.E_DNA.repo.TaxonomicPredictionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.HashSet;
import java.util.Set;

@Service
public class FileAnalysisService {
    private final ObjectMapper objectMapper;
    private final FileAnalysisRepository fileAnalysisRepository;
    private final TaxonomicPredictionRepository taxonomicPredictionRepository;
    private final NovelCandidateRepository novelCandidateRepository;
    private final DiversityMetricRepository diversityMetricRepository;

    @Autowired
    public FileAnalysisService(ObjectMapper objectMapper, FileAnalysisRepository fileAnalysisRepository, TaxonomicPredictionRepository taxonomicPredictionRepository, NovelCandidateRepository novelCandidateRepository, DiversityMetricRepository diversityMetricRepository) {
        this.objectMapper = objectMapper;
        this.fileAnalysisRepository = fileAnalysisRepository;
        this.taxonomicPredictionRepository = taxonomicPredictionRepository;
        this.novelCandidateRepository = novelCandidateRepository;
        this.diversityMetricRepository = diversityMetricRepository;
    }

    @Transactional
    public FileAnalysis saveAnalysisData(String jsonData) throws JsonProcessingException {
        JsonNode root = objectMapper.readTree(jsonData);
        JsonNode overviewNode = root.get("overview");

        FileAnalysis fileAnalysis = new FileAnalysis();
        fileAnalysis.setFileId("analysis-" + System.currentTimeMillis());
        fileAnalysis.setFileName("eDNA_sample.json");
        fileAnalysis.setUploadDate(LocalDateTime.now());
        fileAnalysis.setTotalSamples(overviewNode.get("total_samples_processed").asInt());
        fileAnalysis.setTotalSequences(overviewNode.get("total_sequences").asInt());
        fileAnalysis.setTotalTaxaIdentified(overviewNode.get("total_taxa_identified").asInt());
        fileAnalysis.setTotalNovelCandidates(overviewNode.get("total_novel_candidates").asInt());

        Set<TaxonomicPrediction> predictions = new HashSet<>();
        JsonNode predictionsNode = root.get("taxonomic_predictions");
        if (predictionsNode != null) {
            predictionsNode.fields().forEachRemaining(entry -> {
                String sampleId = entry.getKey();
                entry.getValue().forEach(predNode -> {
                    TaxonomicPrediction prediction = new TaxonomicPrediction();
                    prediction.setFileAnalysis(fileAnalysis);
                    prediction.setSampleId(sampleId);
                    prediction.setSequenceId(predNode.get("sequence_id").asText());
                    prediction.setKingdom(predNode.get("kingdom").asText());
                    prediction.setPhylum(predNode.get("phylum").asText());
                    prediction.setGenus(predNode.get("genus").asText());
                    prediction.setSpecies(predNode.get("species").asText());
                    prediction.setSequenceCount(predNode.get("sequence_count").asInt());
                    prediction.setOverallConfidence(predNode.get("overall_confidence").asDouble());
                    prediction.setNovelCandidate(predNode.get("novel_candidate").asText().equals("Yes"));
                    predictions.add(prediction);
                });
            });
        }
        fileAnalysis.setTaxonomicPredictions(predictions);

        Set<NovelCandidate> novelCandidates = new HashSet<>();
        JsonNode novelCandidatesNode = root.get("novel_candidates");
        if (novelCandidatesNode != null) {
            novelCandidatesNode.fields().forEachRemaining(entry -> {
                entry.getValue().forEach(novelNode -> {
                    NovelCandidate novelCandidate = new NovelCandidate();
                    novelCandidate.setFileAnalysis(fileAnalysis);
                    novelCandidate.setClusterId(novelNode.get("cluster_id").asText());
                    novelCandidate.setSampleId(novelNode.get("sample_id").asText());
                    novelCandidate.setSequenceCount(novelNode.get("sequence_count").asInt());
                    novelCandidate.setOverallConfidence(novelNode.get("overall_confidence").asDouble());
                    novelCandidate.setClosestKnownTaxa(novelNode.get("closest_known_taxa").asText());
                    novelCandidate.setGeneticDistance(novelNode.get("genetic_distance").asDouble());
                    novelCandidate.setPredictedKingdom(novelNode.get("predicted_kingdom").asText());
                    novelCandidate.setPredictedPhylum(novelNode.get("predicted_phylum").asText());
                    novelCandidates.add(novelCandidate);
                });
            });
        }
        fileAnalysis.setNovelCandidates(novelCandidates);

        Set<DiversityMetric> diversityMetrics = new HashSet<>();
        JsonNode diversityMetricsNode = root.get("diversity_data").get("sample_summary");
        if (diversityMetricsNode != null) {
            diversityMetricsNode.fields().forEachRemaining(entry -> {
                String sampleId = entry.getKey();
                JsonNode summaryNode = entry.getValue();
                DiversityMetric diversityMetric = new DiversityMetric();
                diversityMetric.setFileAnalysis(fileAnalysis);
                diversityMetric.setSampleId(sampleId);
                diversityMetric.setDominantKingdom(summaryNode.get("dominant_kingdom").asText());
                diversityMetric.setRareTaxaCount(summaryNode.get("rare_taxa_count").asInt());
                diversityMetric.setTotalSequences(summaryNode.get("total_sequences").asInt());
                diversityMetrics.add(diversityMetric);
            });
        }
        fileAnalysis.setDiversityMetrics(diversityMetrics);

        return fileAnalysisRepository.save(fileAnalysis);
    }

    public FileAnalysis getFileAnalysisById(Long id) {
        Optional<FileAnalysis> analysis = fileAnalysisRepository.findById(id);
        return analysis.orElseThrow(() -> new EntityNotFoundException("FileAnalysis not found with id: " + id));
    }
}