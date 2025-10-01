package com.sahil.edna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "taxonomic_prediction")
@Data
@NoArgsConstructor
public class TaxonomicPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sequenceId;
    private String kingdom;
    private String phylum;
    @Column(name = "class_name")
    private String clazz;
    private String genus;
    private String species;
    private int sequenceCount;
    private double kingdomConfidence;
    private double phylumConfidence;
    private double classConfidence;
    private double genusConfidence;
    private double speciesConfidence;
    private double overallConfidence;
    private String novelCandidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_data_id")
    private SampleData sampleData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public SampleData getSampleData() {
        return sampleData;
    }

    public void setSampleData(SampleData sampleData) {
        this.sampleData = sampleData;
    }
}