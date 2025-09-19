package com.sahil.edna.controller;

import com.sahil.edna.dto.MicrobiomeDataDTO;
import com.sahil.edna.dto.MicrobiomeDataRetrievalDTO;
import com.sahil.edna.dto.OverviewDTO;
import com.sahil.edna.entity.MicrobiomeAnalysis;
import com.sahil.edna.service.MicrobiomeDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/microbiome")
public class MicrobiomeDataController {

    private final MicrobiomeDataService service;

    public MicrobiomeDataController(MicrobiomeDataService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadData(@RequestBody MicrobiomeDataDTO data) {
        service.saveMicrobiomeData(data);
        return ResponseEntity.ok("Microbiome data uploaded and saved successfully!");
    }

    @GetMapping("/{analysisId}")
    public ResponseEntity<MicrobiomeDataDTO> getMicrobiomeData(@PathVariable Long analysisId) {
        MicrobiomeDataDTO data = service.getMicrobiomeData(analysisId);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/overviews")
    public ResponseEntity<List<OverviewDTO>> getAllAnalysesOverview() {
        List<OverviewDTO> overviews = service.getAllAnalysesOverview();
        return ResponseEntity.ok(overviews);
    }


}