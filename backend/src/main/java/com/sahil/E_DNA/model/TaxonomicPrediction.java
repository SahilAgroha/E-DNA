// TaxonomicPrediction.java
package com.sahil.E_DNA.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TaxonomicPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sampleId;
    private String sequenceId;
    private String kingdom;
    private String phylum;
    private String genus;
    private String species;
    private int sequenceCount;
    private double overallConfidence;
    private boolean novelCandidate;

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

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

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

    public double getOverallConfidence() {
        return overallConfidence;
    }

    public void setOverallConfidence(double overallConfidence) {
        this.overallConfidence = overallConfidence;
    }

    public boolean isNovelCandidate() {
        return novelCandidate;
    }

    public void setNovelCandidate(boolean novelCandidate) {
        this.novelCandidate = novelCandidate;
    }

    public FileAnalysis getFileAnalysis() {
        return fileAnalysis;
    }

    public void setFileAnalysis(FileAnalysis fileAnalysis) {
        this.fileAnalysis = fileAnalysis;
    }
}