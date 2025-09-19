package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SampleSummaryDiversityDTO {
    @JsonProperty("dominant_kingdom")
    private String dominantKingdom;
    @JsonProperty("rare_taxa_count")
    private int rareTaxaCount;
    @JsonProperty("total_sequences")
    private int totalSequences;

    public String getDominantKingdom() {
        return dominantKingdom;
    }

    public void setDominantKingdom(String dominantKingdom) {
        this.dominantKingdom = dominantKingdom;
    }

    public int getRareTaxaCount() {
        return rareTaxaCount;
    }

    public void setRareTaxaCount(int rareTaxaCount) {
        this.rareTaxaCount = rareTaxaCount;
    }

    public int getTotalSequences() {
        return totalSequences;
    }

    public void setTotalSequences(int totalSequences) {
        this.totalSequences = totalSequences;
    }
}