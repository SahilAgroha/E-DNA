package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class MicrobiomeDataDTO {
    @JsonProperty("taxonomic_predictions")
    private Map<String, List<TaxonomicPredictionDTO>> taxonomicPredictions;

    @JsonProperty("novel_candidates")
    private Map<String, List<NovelCandidateDTO>> novelCandidates;

    @JsonProperty("abundance_data")
    private AbundanceDataDTO abundanceData;

    @JsonProperty("diversity_data")
    private DiversityDataDTO diversityData;

    private OverviewDTO overview;

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

    public OverviewDTO getOverview() {
        return overview;
    }

    public void setOverview(OverviewDTO overview) {
        this.overview = overview;
    }
}
