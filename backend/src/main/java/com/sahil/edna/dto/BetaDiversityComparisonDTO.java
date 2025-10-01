package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BetaDiversityComparisonDTO {
    @JsonProperty("jaccard_similarity")
    private double jaccardSimilarity;
    @JsonProperty("jaccard_distance")
    private double jaccardDistance;
    @JsonProperty("shared_species")
    private int sharedSpecies;
    @JsonProperty("total_unique_species")
    private int totalUniqueSpecies;

    public double getJaccardSimilarity() {
        return jaccardSimilarity;
    }

    public void setJaccardSimilarity(double jaccardSimilarity) {
        this.jaccardSimilarity = jaccardSimilarity;
    }

    public double getJaccardDistance() {
        return jaccardDistance;
    }

    public void setJaccardDistance(double jaccardDistance) {
        this.jaccardDistance = jaccardDistance;
    }

    public int getSharedSpecies() {
        return sharedSpecies;
    }

    public void setSharedSpecies(int sharedSpecies) {
        this.sharedSpecies = sharedSpecies;
    }

    public int getTotalUniqueSpecies() {
        return totalUniqueSpecies;
    }

    public void setTotalUniqueSpecies(int totalUniqueSpecies) {
        this.totalUniqueSpecies = totalUniqueSpecies;
    }
}