// DiversityMetric.java
package com.sahil.E_DNA.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DiversityMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sampleId;
    private double speciesRichness;
    private double shannonDiversity;
    private double simpsonDiversity;
    private double evenness;
    private String dominantKingdom;
    private int rareTaxaCount;
    private int totalSequences;

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

    public double getSpeciesRichness() {
        return speciesRichness;
    }

    public void setSpeciesRichness(double speciesRichness) {
        this.speciesRichness = speciesRichness;
    }

    public double getShannonDiversity() {
        return shannonDiversity;
    }

    public void setShannonDiversity(double shannonDiversity) {
        this.shannonDiversity = shannonDiversity;
    }

    public double getSimpsonDiversity() {
        return simpsonDiversity;
    }

    public void setSimpsonDiversity(double simpsonDiversity) {
        this.simpsonDiversity = simpsonDiversity;
    }

    public double getEvenness() {
        return evenness;
    }

    public void setEvenness(double evenness) {
        this.evenness = evenness;
    }

    public String getDominantKingdom() {
        return dominantKingdom;
    }

    public void setDominantKingdom(String dominantKingdom) {
        this.dominantKingdom = dominantKingdom;
    }

    public int getRareTaxaCount() {
        return rareTaxaCount;
    }

    public void setRareTaxaCount(int rareTaxaCount) {
        this.rareTaxaCount = rareTaxaCount;
    }

    public int getTotalSequences() {
        return totalSequences;
    }

    public void setTotalSequences(int totalSequences) {
        this.totalSequences = totalSequences;
    }

    public FileAnalysis getFileAnalysis() {
        return fileAnalysis;
    }

    public void setFileAnalysis(FileAnalysis fileAnalysis) {
        this.fileAnalysis = fileAnalysis;
    }
}