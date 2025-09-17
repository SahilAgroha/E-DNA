package com.sahil.E_DNA.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sahil.E_DNA.service.FileAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@RestController
public class home {

    private final FileAnalysisService fileAnalysisService;

    @Autowired
    public home(FileAnalysisService fileAnalysisService) {
        this.fileAnalysisService = fileAnalysisService;
    }

    @Autowired
    private ResourceLoader resourceLoader;

    @GetMapping("/save")
    public String home() throws IOException, JsonProcessingException {
        Resource resource = resourceLoader.getResource("classpath:data.json");
        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            String jsonData = FileCopyUtils.copyToString(reader);
            fileAnalysisService.saveAnalysisData(jsonData);
        }
        return "Data loaded from file and saved successfully.";
    }
}