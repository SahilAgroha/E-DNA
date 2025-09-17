// FileAnalysisController.java
package com.sahil.E_DNA.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sahil.E_DNA.model.FileAnalysis;
import com.sahil.E_DNA.service.FileAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/data")
public class FileAnalysisController {
    @Autowired private FileAnalysisService fileAnalysisService;

    @PostMapping("/upload")
    public ResponseEntity<FileAnalysis> uploadFileAnalysis(@RequestBody String jsonData) throws JsonProcessingException {
        FileAnalysis savedAnalysis = fileAnalysisService.saveAnalysisData(jsonData);
        return ResponseEntity.ok(savedAnalysis);
    }

    @GetMapping("/analysis/{id}")
    public ResponseEntity<FileAnalysis> getFileAnalysisById(@PathVariable Long id) {
        FileAnalysis analysis = fileAnalysisService.getFileAnalysisById(id);
        return ResponseEntity.ok(analysis);
    }
}