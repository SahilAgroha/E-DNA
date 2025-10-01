package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TaxonomicPredictionDTO {
    @JsonProperty("sequence_id")
    private String sequenceId;
    private String kingdom;
    private String phylum;
    @JsonProperty("class")
    private String clazz;
    private String genus;
    private String species;
    @JsonProperty("sequence_count")
    private int sequenceCount;
    @JsonProperty("kingdom_confidence")
    private double kingdomConfidence;
    @JsonProperty("phylum_confidence")
    private double phylumConfidence;
    @JsonProperty("class_confidence")
    private double classConfidence;
    @JsonProperty("genus_confidence")
    private double genusConfidence;
    @JsonProperty("species_confidence")
    private double speciesConfidence;
    @JsonProperty("overall_confidence")
    private double overallConfidence;
    @JsonProperty("novel_candidate")
    private String novelCandidate;

    public String getSequenceId() {
        return sequenceId;
    }

    public void setSequenceId(String sequenceId) {
        this.sequenceId = sequenceId;
    }

    public String getKingdom() {
        return kingdom;
    }

    public void setKingdom(String kingdom) {
        this.kingdom = kingdom;
    }

    public String getPhylum() {
        return phylum;
    }

    public void setPhylum(String phylum) {
        this.phylum = phylum;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public String getGenus() {
        return genus;
    }

    public void setGenus(String genus) {
        this.genus = genus;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public int getSequenceCount() {
        return sequenceCount;
    }

    public void setSequenceCount(int sequenceCount) {
        this.sequenceCount = sequenceCount;
    }

    public double getKingdomConfidence() {
        return kingdomConfidence;
    }

    public void setKingdomConfidence(double kingdomConfidence) {
        this.kingdomConfidence = kingdomConfidence;
    }

    public double getPhylumConfidence() {
        return phylumConfidence;
    }

    public void setPhylumConfidence(double phylumConfidence) {
        this.phylumConfidence = phylumConfidence;
    }

    public double getClassConfidence() {
        return classConfidence;
    }

    public void setClassConfidence(double classConfidence) {
        this.classConfidence = classConfidence;
    }

    public double getGenusConfidence() {
        return genusConfidence;
    }

    public void setGenusConfidence(double genusConfidence) {
        this.genusConfidence = genusConfidence;
    }

    public double getSpeciesConfidence() {
        return speciesConfidence;
    }

    public void setSpeciesConfidence(double speciesConfidence) {
        this.speciesConfidence = speciesConfidence;
    }

    public double getOverallConfidence() {
        return overallConfidence;
    }

    public void setOverallConfidence(double overallConfidence) {
        this.overallConfidence = overallConfidence;
    }

    public String getNovelCandidate() {
        return novelCandidate;
    }

    public void setNovelCandidate(String novelCandidate) {
        this.novelCandidate = novelCandidate;
    }
}