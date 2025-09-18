package com.sahil.E_DNA.controller;

import com.sahil.E_DNA.model.NovelCandidate;
import com.sahil.E_DNA.service.NovelTaxaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/novel-taxa") // Correct base path
public class NovelTaxaController {

    private final NovelTaxaService novelTaxaService;

    @Autowired
    public NovelTaxaController(NovelTaxaService novelTaxaService) {
        this.novelTaxaService = novelTaxaService;
    }

    @GetMapping
    public ResponseEntity<List<NovelCandidate>> getAllNovelCandidates() {
        List<NovelCandidate> candidates = novelTaxaService.getAllNovelCandidates();
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NovelCandidate> getNovelCandidateById(@PathVariable Long id) {
        NovelCandidate candidate = novelTaxaService.getNovelCandidateById(id);
        return ResponseEntity.ok(candidate);
    }

    @GetMapping("/search")
    public ResponseEntity<List<NovelCandidate>> searchNovelCandidates(
            @RequestParam(required = false) String sampleId,
            @RequestParam(required = false) String clusterId
    ) {
        List<NovelCandidate> results = novelTaxaService.searchByAttributes(sampleId, clusterId);
        return ResponseEntity.ok(results);
    }
}