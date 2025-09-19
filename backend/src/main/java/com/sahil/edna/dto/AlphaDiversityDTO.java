package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class AlphaDiversityDTO {
    @JsonProperty("species_richness")
    private Map<String, Integer> speciesRichness;
    @JsonProperty("shannon_diversity")
    private Map<String, Double> shannonDiversity;
    @JsonProperty("simpson_diversity")
    private Map<String, Double> simpsonDiversity;
    private Map<String, Double> evenness;

    public Map<String, Integer> getSpeciesRichness() {
        return speciesRichness;
    }

    public void setSpeciesRichness(Map<String, Integer> speciesRichness) {
        this.speciesRichness = speciesRichness;
    }

    public Map<String, Double> getShannonDiversity() {
        return shannonDiversity;
    }

    public void setShannonDiversity(Map<String, Double> shannonDiversity) {
        this.shannonDiversity = shannonDiversity;
    }

    public Map<String, Double> getSimpsonDiversity() {
        return simpsonDiversity;
    }

    public void setSimpsonDiversity(Map<String, Double> simpsonDiversity) {
        this.simpsonDiversity = simpsonDiversity;
    }

    public Map<String, Double> getEvenness() {
        return evenness;
    }

    public void setEvenness(Map<String, Double> evenness) {
        this.evenness = evenness;
    }
}