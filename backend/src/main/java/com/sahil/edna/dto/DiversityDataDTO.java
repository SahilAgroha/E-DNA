package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class DiversityDataDTO {
    @JsonProperty("alpha_diversity")
    private AlphaDiversityDTO alphaDiversity;
    @JsonProperty("beta_diversity")
    private Map<String, BetaDiversityComparisonDTO> betaDiversity;
    @JsonProperty("sample_summary")
    private Map<String, SampleSummaryDiversityDTO> sampleSummary;

    public AlphaDiversityDTO getAlphaDiversity() {
        return alphaDiversity;
    }

    public void setAlphaDiversity(AlphaDiversityDTO alphaDiversity) {
        this.alphaDiversity = alphaDiversity;
    }

    public Map<String, BetaDiversityComparisonDTO> getBetaDiversity() {
        return betaDiversity;
    }

    public void setBetaDiversity(Map<String, BetaDiversityComparisonDTO> betaDiversity) {
        this.betaDiversity = betaDiversity;
    }

    public Map<String, SampleSummaryDiversityDTO> getSampleSummary() {
        return sampleSummary;
    }

    public void setSampleSummary(Map<String, SampleSummaryDiversityDTO> sampleSummary) {
        this.sampleSummary = sampleSummary;
    }
}