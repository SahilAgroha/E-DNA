package com.sahil.E_DNA.controller;

import com.sahil.E_DNA.model.TaxonomicPrediction;
import com.sahil.E_DNA.service.TaxaDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/taxa")
public class TaxaDataController {

    private final TaxaDataService taxaDataService;

    @Autowired
    public TaxaDataController(TaxaDataService taxaDataService) {
        this.taxaDataService = taxaDataService;
    }

    @GetMapping
    public ResponseEntity<List<TaxonomicPrediction>> getAllTaxonomicPredictions() {
        List<TaxonomicPrediction> predictions = taxaDataService.getAllTaxonomicPredictions();
        return ResponseEntity.ok(predictions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaxonomicPrediction> getTaxonomicPredictionById(@PathVariable Long id) {
        TaxonomicPrediction prediction = taxaDataService.getTaxonomicPredictionById(id);
        return ResponseEntity.ok(prediction);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TaxonomicPrediction>> searchTaxonomicPredictions(
            @RequestParam(required = false) String sampleId,
            @RequestParam(required = false) String sequenceId,
            @RequestParam(required = false) String kingdom,
            @RequestParam(required = false) String phylum,
            @RequestParam(required = false) String genus,
            @RequestParam(required = false) String species
    ) {
        List<TaxonomicPrediction> results = taxaDataService.searchByAttributes(
                sampleId,
                sequenceId,
                kingdom,
                phylum,
                genus,
                species
        );
        return ResponseEntity.ok(results);
    }
}