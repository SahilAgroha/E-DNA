package com.sahil.E_DNA.controller;

import com.sahil.E_DNA.model.DiversityMetric;
import com.sahil.E_DNA.service.DiversityMetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/diversity")
public class DiversityController {

    private final DiversityMetricService diversityMetricService;

    @Autowired
    public DiversityController(DiversityMetricService diversityMetricService) {
        this.diversityMetricService = diversityMetricService;
    }

    @GetMapping
    public ResponseEntity<List<DiversityMetric>> getAllDiversityMetrics() {
        List<DiversityMetric> metrics = diversityMetricService.getAllDiversityMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiversityMetric> getDiversityMetricById(@PathVariable Long id) {
        DiversityMetric metric = diversityMetricService.getDiversityMetricById(id);
        return ResponseEntity.ok(metric);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DiversityMetric>> searchDiversityMetrics(
            @RequestParam(required = false) String sampleId,
            @RequestParam(required = false) String dominantKingdom
    ) {
        List<DiversityMetric> results = diversityMetricService.searchByAttributes(sampleId, dominantKingdom);
        return ResponseEntity.ok(results);
    }
}