package com.sahil.edna.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class MicrobiomeDataRetrievalDTO {
    private Long id; // Include the generated ID
    private OverviewDTO overview;
    private Map<String, List<TaxonomicPredictionDTO>> taxonomicPredictions;
    private Map<String, List<NovelCandidateDTO>> novelCandidates;
    private AbundanceDataDTO abundanceData;
    private DiversityDataDTO diversityData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OverviewDTO getOverview() {
        return overview;
    }

    public void setOverview(OverviewDTO overview) {
        this.overview = overview;
    }

    public Map<String, List<TaxonomicPredictionDTO>> getTaxonomicPredictions() {
        return taxonomicPredictions;
    }

    public void setTaxonomicPredictions(Map<String, List<TaxonomicPredictionDTO>> taxonomicPredictions) {
        this.taxonomicPredictions = taxonomicPredictions;
    }

    public Map<String, List<NovelCandidateDTO>> getNovelCandidates() {
        return novelCandidates;
    }

    public void setNovelCandidates(Map<String, List<NovelCandidateDTO>> novelCandidates) {
        this.novelCandidates = novelCandidates;
    }

    public AbundanceDataDTO getAbundanceData() {
        return abundanceData;
    }

    public void setAbundanceData(AbundanceDataDTO abundanceData) {
        this.abundanceData = abundanceData;
    }

    public DiversityDataDTO getDiversityData() {
        return diversityData;
    }

    public void setDiversityData(DiversityDataDTO diversityData) {
        this.diversityData = diversityData;
    }
}