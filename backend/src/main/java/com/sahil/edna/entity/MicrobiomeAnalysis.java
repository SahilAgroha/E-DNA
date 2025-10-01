package com.sahil.edna.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "microbiome_analysis")
@Data
@NoArgsConstructor
public class MicrobiomeAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalSamplesProcessed;
    private int totalSequences;
    private int totalTaxaIdentified;
    private int totalNovelCandidates;
    private double avgShannon;
    private double avgRichness;
    private double avgEvenness;

    @JsonManagedReference
    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SampleData> samples;

    @JsonManagedReference
    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KingdomDistribution> kingdomDistribution;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTotalSamplesProcessed() {
        return totalSamplesProcessed;
    }

    public void setTotalSamplesProcessed(int totalSamplesProcessed) {
        this.totalSamplesProcessed = totalSamplesProcessed;
    }

    public int getTotalSequences() {
        return totalSequences;
    }

    public void setTotalSequences(int totalSequences) {
        this.totalSequences = totalSequences;
    }

    public int getTotalTaxaIdentified() {
        return totalTaxaIdentified;
    }

    public void setTotalTaxaIdentified(int totalTaxaIdentified) {
        this.totalTaxaIdentified = totalTaxaIdentified;
    }

    public int getTotalNovelCandidates() {
        return totalNovelCandidates;
    }

    public void setTotalNovelCandidates(int totalNovelCandidates) {
        this.totalNovelCandidates = totalNovelCandidates;
    }

    public double getAvgShannon() {
        return avgShannon;
    }

    public void setAvgShannon(double avgShannon) {
        this.avgShannon = avgShannon;
    }

    public double getAvgRichness() {
        return avgRichness;
    }

    public void setAvgRichness(double avgRichness) {
        this.avgRichness = avgRichness;
    }

    public double getAvgEvenness() {
        return avgEvenness;
    }

    public void setAvgEvenness(double avgEvenness) {
        this.avgEvenness = avgEvenness;
    }

    public List<SampleData> getSamples() {
        return samples;
    }

    public void setSamples(List<SampleData> samples) {
        this.samples = samples;
    }

    public List<KingdomDistribution> getKingdomDistribution() {
        return kingdomDistribution;
    }

    public void setKingdomDistribution(List<KingdomDistribution> kingdomDistribution) {
        this.kingdomDistribution = kingdomDistribution;
    }
}