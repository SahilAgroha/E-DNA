// OverviewSummary.java
package com.sahil.E_DNA.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OverviewSummary {
    private Long totalFiles;
    private Long totalSamples;
    private Long totalTaxa;
    private Double avgShannonDiversity;

    public OverviewSummary(Long totalFiles, Long totalSamples, Long totalTaxa, Double avgShannonDiversity) {
        this.totalFiles = totalFiles;
        this.totalSamples = totalSamples;
        this.totalTaxa = totalTaxa;
        this.avgShannonDiversity = avgShannonDiversity;
    }

    public Long getTotalFiles() {
        return totalFiles;
    }

    public void setTotalFiles(Long totalFiles) {
        this.totalFiles = totalFiles;
    }

    public Long getTotalSamples() {
        return totalSamples;
    }

    public void setTotalSamples(Long totalSamples) {
        this.totalSamples = totalSamples;
    }

    public Long getTotalTaxa() {
        return totalTaxa;
    }

    public void setTotalTaxa(Long totalTaxa) {
        this.totalTaxa = totalTaxa;
    }

    public Double getAvgShannonDiversity() {
        return avgShannonDiversity;
    }

    public void setAvgShannonDiversity(Double avgShannonDiversity) {
        this.avgShannonDiversity = avgShannonDiversity;
    }
}