package com.sahil.edna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "novel_candidate")
@Data
@NoArgsConstructor
public class NovelCandidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clusterId;
    private int sequenceCount;
    private double overallConfidence;
    private String closestKnownTaxa;
    private double geneticDistance;
    private String predictedKingdom;
    private String predictedPhylum;
    private double kingdomConfidence;
    private double phylumConfidence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_data_id")
    private SampleData sampleData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClusterId() {
        return clusterId;
    }

    public void setClusterId(String clusterId) {
        this.clusterId = clusterId;
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

    public SampleData getSampleData() {
        return sampleData;
    }

    public void setSampleData(SampleData sampleData) {
        this.sampleData = sampleData;
    }
}