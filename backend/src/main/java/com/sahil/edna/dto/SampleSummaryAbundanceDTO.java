package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SampleSummaryAbundanceDTO {
    @JsonProperty("total_sequences")
    private int totalSequences;
    @JsonProperty("total_taxa")
    private int totalTaxa;

    public int getTotalSequences() {
        return totalSequences;
    }

    public void setTotalSequences(int totalSequences) {
        this.totalSequences = totalSequences;
    }

    public int getTotalTaxa() {
        return totalTaxa;
    }

    public void setTotalTaxa(int totalTaxa) {
        this.totalTaxa = totalTaxa;
    }
}