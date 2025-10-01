package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class OverviewDTO {
    private Long id;

    @JsonProperty("total_samples_processed")
    private int totalSamplesProcessed;
    @JsonProperty("total_sequences")
    private int totalSequences;
    @JsonProperty("total_taxa_identified")
    private int totalTaxaIdentified;
    @JsonProperty("total_novel_candidates")
    private int totalNovelCandidates;
    @JsonProperty("average_alpha_diversity")
    private AverageAlphaDiversityDTO averageAlphaDiversity;
    @JsonProperty("kingdom_distribution")
    private Map<String, Integer> kingdomDistribution;

    public int getTotalSamplesProcessed() {
        return totalSamplesProcessed;
    }

    public void setTotalSamplesProcessed(int totalSamplesProcessed) {
        this.totalSamplesProcessed = totalSamplesProcessed;
    }

    public int getTotalSequences() {
        return totalSequences;
    }

    public void setTotalSequences(int totalSequences) {
        this.totalSequences = totalSequences;
    }

    public int getTotalTaxaIdentified() {
        return totalTaxaIdentified;
    }

    public void setTotalTaxaIdentified(int totalTaxaIdentified) {
        this.totalTaxaIdentified = totalTaxaIdentified;
    }

    public int getTotalNovelCandidates() {
        return totalNovelCandidates;
    }

    public void setTotalNovelCandidates(int totalNovelCandidates) {
        this.totalNovelCandidates = totalNovelCandidates;
    }

    public AverageAlphaDiversityDTO getAverageAlphaDiversity() {
        return averageAlphaDiversity;
    }

    public void setAverageAlphaDiversity(AverageAlphaDiversityDTO averageAlphaDiversity) {
        this.averageAlphaDiversity = averageAlphaDiversity;
    }

    public Map<String, Integer> getKingdomDistribution() {
        return kingdomDistribution;
    }

    public void setKingdomDistribution(Map<String, Integer> kingdomDistribution) {
        this.kingdomDistribution = kingdomDistribution;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}