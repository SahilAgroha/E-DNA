package com.sahil.E_DNA.service;

import com.sahil.E_DNA.model.DiversityMetric;
import com.sahil.E_DNA.repo.DiversityMetricRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiversityMetricService {

    private final DiversityMetricRepository diversityMetricRepository;

    @Autowired
    public DiversityMetricService(DiversityMetricRepository diversityMetricRepository) {
        this.diversityMetricRepository = diversityMetricRepository;
    }

    public List<DiversityMetric> getAllDiversityMetrics() {
        return diversityMetricRepository.findAll();
    }

    public DiversityMetric getDiversityMetricById(Long id) {
        Optional<DiversityMetric> metric = diversityMetricRepository.findById(id);
        return metric.orElseThrow(() -> new EntityNotFoundException("Diversity Metric not found with id: " + id));
    }

    public List<DiversityMetric> searchByAttributes(String sampleId, String dominantKingdom) {
        if (sampleId != null && !sampleId.isBlank()) {
            return diversityMetricRepository.findBySampleId(sampleId);
        }
        if (dominantKingdom != null && !dominantKingdom.isBlank()) {
            return diversityMetricRepository.findByDominantKingdom(dominantKingdom);
        }
        return List.of(); // Return an empty list if no search parameters are provided
    }
}