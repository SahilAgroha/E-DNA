// FileAnalysis.java
package com.sahil.E_DNA.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
public class FileAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileId;
    private String fileName;
    private LocalDateTime uploadDate;
    private int totalSamples;
    private int totalSequences;
    private int totalTaxaIdentified;
    private int totalNovelCandidates;

    @OneToMany(mappedBy = "fileAnalysis", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TaxonomicPrediction> taxonomicPredictions;

    @OneToMany(mappedBy = "fileAnalysis", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NovelCandidate> novelCandidates;

    @OneToMany(mappedBy = "fileAnalysis", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DiversityMetric> diversityMetrics;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public int getTotalSamples() {
        return totalSamples;
    }

    public void setTotalSamples(int totalSamples) {
        this.totalSamples = totalSamples;
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

    public Set<TaxonomicPrediction> getTaxonomicPredictions() {
        return taxonomicPredictions;
    }

    public void setTaxonomicPredictions(Set<TaxonomicPrediction> taxonomicPredictions) {
        this.taxonomicPredictions = taxonomicPredictions;
    }

    public Set<NovelCandidate> getNovelCandidates() {
        return novelCandidates;
    }

    public void setNovelCandidates(Set<NovelCandidate> novelCandidates) {
        this.novelCandidates = novelCandidates;
    }

    public Set<DiversityMetric> getDiversityMetrics() {
        return diversityMetrics;
    }

    public void setDiversityMetrics(Set<DiversityMetric> diversityMetrics) {
        this.diversityMetrics = diversityMetrics;
    }
}