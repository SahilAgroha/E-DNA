package com.sahil.edna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "sample_data")
@Data
@NoArgsConstructor
public class SampleData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sampleId;
    private String dominantKingdom;
    private int rareTaxaCount;
    private int totalSequences;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analysis_id")
    private MicrobiomeAnalysis analysis;

    @OneToMany(mappedBy = "sampleData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaxonomicPrediction> taxonomicPredictions;

    @OneToMany(mappedBy = "sampleData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NovelCandidate> novelCandidates;

    @OneToMany(mappedBy = "sampleData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AbundanceData> abundanceData;

    @OneToMany(mappedBy = "sampleData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlphaDiversityData> alphaDiversityData;

    @OneToMany(mappedBy = "sampleData1", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BetaDiversityComparison> betaDiversityComparisonsAsSample1;

    @OneToMany(mappedBy = "sampleData2", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BetaDiversityComparison> betaDiversityComparisonsAsSample2;

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

    public MicrobiomeAnalysis getAnalysis() {
        return analysis;
    }

    public void setAnalysis(MicrobiomeAnalysis analysis) {
        this.analysis = analysis;
    }

    public List<TaxonomicPrediction> getTaxonomicPredictions() {
        return taxonomicPredictions;
    }

    public void setTaxonomicPredictions(List<TaxonomicPrediction> taxonomicPredictions) {
        this.taxonomicPredictions = taxonomicPredictions;
    }

    public List<NovelCandidate> getNovelCandidates() {
        return novelCandidates;
    }

    public void setNovelCandidates(List<NovelCandidate> novelCandidates) {
        this.novelCandidates = novelCandidates;
    }

    public List<AbundanceData> getAbundanceData() {
        return abundanceData;
    }

    public void setAbundanceData(List<AbundanceData> abundanceData) {
        this.abundanceData = abundanceData;
    }

    public List<AlphaDiversityData> getAlphaDiversityData() {
        return alphaDiversityData;
    }

    public void setAlphaDiversityData(List<AlphaDiversityData> alphaDiversityData) {
        this.alphaDiversityData = alphaDiversityData;
    }

    public List<BetaDiversityComparison> getBetaDiversityComparisonsAsSample1() {
        return betaDiversityComparisonsAsSample1;
    }

    public void setBetaDiversityComparisonsAsSample1(List<BetaDiversityComparison> betaDiversityComparisonsAsSample1) {
        this.betaDiversityComparisonsAsSample1 = betaDiversityComparisonsAsSample1;
    }

    public List<BetaDiversityComparison> getBetaDiversityComparisonsAsSample2() {
        return betaDiversityComparisonsAsSample2;
    }

    public void setBetaDiversityComparisonsAsSample2(List<BetaDiversityComparison> betaDiversityComparisonsAsSample2) {
        this.betaDiversityComparisonsAsSample2 = betaDiversityComparisonsAsSample2;
    }
}