package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class AbundanceDataDTO {
    @JsonProperty("kingdom_level")
    private Map<String, Map<String, Integer>> kingdomLevel;
    @JsonProperty("phylum_level")
    private Map<String, Map<String, Integer>> phylumLevel;
    @JsonProperty("genus_level")
    private Map<String, Map<String, Integer>> genusLevel;
    @JsonProperty("species_level")
    private Map<String, Map<String, Integer>> speciesLevel;
    private Map<String, SampleSummaryAbundanceDTO> summary;

    public Map<String, Map<String, Integer>> getKingdomLevel() {
        return kingdomLevel;
    }

    public void setKingdomLevel(Map<String, Map<String, Integer>> kingdomLevel) {
        this.kingdomLevel = kingdomLevel;
    }

    public Map<String, Map<String, Integer>> getPhylumLevel() {
        return phylumLevel;
    }

    public void setPhylumLevel(Map<String, Map<String, Integer>> phylumLevel) {
        this.phylumLevel = phylumLevel;
    }

    public Map<String, Map<String, Integer>> getGenusLevel() {
        return genusLevel;
    }

    public void setGenusLevel(Map<String, Map<String, Integer>> genusLevel) {
        this.genusLevel = genusLevel;
    }

    public Map<String, Map<String, Integer>> getSpeciesLevel() {
        return speciesLevel;
    }

    public void setSpeciesLevel(Map<String, Map<String, Integer>> speciesLevel) {
        this.speciesLevel = speciesLevel;
    }

    public Map<String, SampleSummaryAbundanceDTO> getSummary() {
        return summary;
    }

    public void setSummary(Map<String, SampleSummaryAbundanceDTO> summary) {
        this.summary = summary;
    }
}