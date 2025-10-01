package com.sahil.edna.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class NovelCandidateDTO {
    @JsonProperty("cluster_id")
    private String clusterId;
    @JsonProperty("sample_id")
    private String sampleId;
    @JsonProperty("sequence_count")
    private int sequenceCount;
    @JsonProperty("overall_confidence")
    private double overallConfidence;
    @JsonProperty("closest_known_taxa")
    private String closestKnownTaxa;
    @JsonProperty("genetic_distance")
    private double geneticDistance;
    @JsonProperty("predicted_kingdom")
    private String predictedKingdom;
    @JsonProperty("predicted_phylum")
    private String predictedPhylum;
    @JsonProperty("kingdom_confidence")
    private double kingdomConfidence;
    @JsonProperty("phylum_confidence")
    private double phylumConfidence;

    public String getClusterId() {
        return clusterId;
    }

    public void setClusterId(String clusterId) {
        this.clusterId = clusterId;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    public int getSequenceCount() {
        return sequenceCount;
    }

    public void setSequenceCount(int sequenceCount) {
        this.sequenceCount = sequenceCount;
    }

    public double getOverallConfidence() {
        return overallConfidence;
    }

    public void setOverallConfidence(double overallConfidence) {
        this.overallConfidence = overallConfidence;
    }

    public String getClosestKnownTaxa() {
        return closestKnownTaxa;
    }

    public void setClosestKnownTaxa(String closestKnownTaxa) {
        this.closestKnownTaxa = closestKnownTaxa;
    }

    public double getGeneticDistance() {
        return geneticDistance;
    }

    public void setGeneticDistance(double geneticDistance) {
        this.geneticDistance = geneticDistance;
    }

    public String getPredictedKingdom() {
        return predictedKingdom;
    }

    public void setPredictedKingdom(String predictedKingdom) {
        this.predictedKingdom = predictedKingdom;
    }

    public String getPredictedPhylum() {
        return predictedPhylum;
    }

    public void setPredictedPhylum(String predictedPhylum) {
        this.predictedPhylum = predictedPhylum;
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
}