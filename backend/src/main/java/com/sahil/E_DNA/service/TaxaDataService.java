// TaxaDataService.java
package com.sahil.E_DNA.service;

import com.sahil.E_DNA.model.TaxonomicPrediction;
import com.sahil.E_DNA.repo.TaxonomicPredictionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TaxaDataService {
    private final TaxonomicPredictionRepository taxonomicPredictionRepository;

    @Autowired
    public TaxaDataService(TaxonomicPredictionRepository taxonomicPredictionRepository) {
        this.taxonomicPredictionRepository = taxonomicPredictionRepository;
    }

    public TaxonomicPrediction getTaxonomicPredictionById(Long id) {
        Optional<TaxonomicPrediction> prediction = taxonomicPredictionRepository.findById(id);
        return prediction.orElseThrow(() -> new EntityNotFoundException("Taxonomic Prediction not found with id: " + id));
    }
}