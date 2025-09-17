// NovelTaxaController.java
package com.sahil.E_DNA.controller;

import com.sahil.E_DNA.model.NovelCandidate;
import com.sahil.E_DNA.service.NovelTaxaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class NovelTaxaController {
    private final NovelTaxaService novelTaxaService;

    @Autowired
    public NovelTaxaController(NovelTaxaService novelTaxaService) {
        this.novelTaxaService = novelTaxaService;
    }

    @GetMapping("/novel-taxa/{id}")
    public ResponseEntity<NovelCandidate> getNovelCandidateById(@PathVariable Long id) {
        NovelCandidate candidate = novelTaxaService.getNovelCandidateById(id);
        return ResponseEntity.ok(candidate);
    }
}