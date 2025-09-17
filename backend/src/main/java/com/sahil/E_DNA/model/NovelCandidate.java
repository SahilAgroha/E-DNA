// NovelCandidate.java
package com.sahil.E_DNA.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class NovelCandidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clusterId;
    private String sampleId;
    private int sequenceCount;
    private double overallConfidence;
    private String closestKnownTaxa;
    private double geneticDistance;
    private String predictedKingdom;
    private String predictedPhylum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_analysis_id")
    @JsonIgnore
    private FileAnalysis fileAnalysis;

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

    public FileAnalysis getFileAnalysis() {
        return fileAnalysis;
    }

    public void setFileAnalysis(FileAnalysis fileAnalysis) {
        this.fileAnalysis = fileAnalysis;
    }
}