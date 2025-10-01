package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AverageAlphaDiversityDTO {
    @JsonProperty("avg_shannon")
    private double avgShannon;
    @JsonProperty("avg_richness")
    private double avgRichness;
    @JsonProperty("avg_evenness")
    private double avgEvenness;

    public double getAvgShannon() {
        return avgShannon;
    }

    public void setAvgShannon(double avgShannon) {
        this.avgShannon = avgShannon;
    }

    public double getAvgRichness() {
        return avgRichness;
    }

    public void setAvgRichness(double avgRichness) {
        this.avgRichness = avgRichness;
    }

    public double getAvgEvenness() {
        return avgEvenness;
    }

    public void setAvgEvenness(double avgEvenness) {
        this.avgEvenness = avgEvenness;
    }
}