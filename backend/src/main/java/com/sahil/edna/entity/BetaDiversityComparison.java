package com.sahil.edna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "beta_diversity_comparison")
@Data
@NoArgsConstructor
public class BetaDiversityComparison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comparisonName;
    private double jaccardSimilarity;
    private double jaccardDistance;
    private int sharedSpecies;
    private int totalUniqueSpecies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_data_1_id")
    private SampleData sampleData1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_data_2_id")
    private SampleData sampleData2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComparisonName() {
        return comparisonName;
    }

    public void setComparisonName(String comparisonName) {
        this.comparisonName = comparisonName;
    }

    public double getJaccardSimilarity() {
        return jaccardSimilarity;
    }

    public void setJaccardSimilarity(double jaccardSimilarity) {
        this.jaccardSimilarity = jaccardSimilarity;
    }

    public double getJaccardDistance() {
        return jaccardDistance;
    }

    public void setJaccardDistance(double jaccardDistance) {
        this.jaccardDistance = jaccardDistance;
    }

    public int getSharedSpecies() {
        return sharedSpecies;
    }

    public void setSharedSpecies(int sharedSpecies) {
        this.sharedSpecies = sharedSpecies;
    }

    public int getTotalUniqueSpecies() {
        return totalUniqueSpecies;
    }

    public void setTotalUniqueSpecies(int totalUniqueSpecies) {
        this.totalUniqueSpecies = totalUniqueSpecies;
    }

    public SampleData getSampleData1() {
        return sampleData1;
    }

    public void setSampleData1(SampleData sampleData1) {
        this.sampleData1 = sampleData1;
    }

    public SampleData getSampleData2() {
        return sampleData2;
    }

    public void setSampleData2(SampleData sampleData2) {
        this.sampleData2 = sampleData2;
    }
}