// DashboardController.java
package com.sahil.E_DNA.controller;

import com.sahil.E_DNA.model.OverviewSummary;
import com.sahil.E_DNA.repo.FileAnalysisRepository;
import com.sahil.E_DNA.repo.TaxonomicPredictionRepository;
import com.sahil.E_DNA.repo.DiversityMetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController

@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired private FileAnalysisRepository fileAnalysisRepository;
    @Autowired private TaxonomicPredictionRepository taxonomicPredictionRepository;
    @Autowired private DiversityMetricRepository diversityMetricRepository;

    @GetMapping("/overview")
    public OverviewSummary getOverallSummary() {
        Long totalFiles = fileAnalysisRepository.count();
        Long totalSamples = fileAnalysisRepository.sumTotalSamples();
        Long totalTaxa = fileAnalysisRepository.sumTotalTaxaIdentified();
        Double avgShannon = diversityMetricRepository.getAverageShannonDiversity();
        return new OverviewSummary(totalFiles, totalSamples, totalTaxa, avgShannon);
    }

    @GetMapping("/abundance/{fileId}")
    public Map<String, Object> getAbundanceData(@PathVariable String fileId) {
        List<Object[]> phylumData = taxonomicPredictionRepository.findAbundanceByPhylum(fileId);
        List<Object[]> genusData = taxonomicPredictionRepository.findAbundanceByGenus(fileId);

        Map<String, Object> response = new HashMap<>();
        response.put("phylumLevel", phylumData);
        response.put("genusLevel", genusData);
        return response;
    }
}