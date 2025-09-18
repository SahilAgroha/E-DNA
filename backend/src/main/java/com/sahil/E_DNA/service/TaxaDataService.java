package com.sahil.E_DNA.service;

import com.sahil.E_DNA.model.TaxonomicPrediction;
import com.sahil.E_DNA.repo.TaxonomicPredictionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaxaDataService {

    private final TaxonomicPredictionRepository taxonomicPredictionRepository;

    @Autowired
    public TaxaDataService(TaxonomicPredictionRepository taxonomicPredictionRepository) {
        this.taxonomicPredictionRepository = taxonomicPredictionRepository;
    }

    public List<TaxonomicPrediction> getAllTaxonomicPredictions() {
        return taxonomicPredictionRepository.findAll();
    }

    public TaxonomicPrediction getTaxonomicPredictionById(Long id) {
        Optional<TaxonomicPrediction> prediction = taxonomicPredictionRepository.findById(id);
        return prediction.orElseThrow(() -> new EntityNotFoundException("Taxonomic Prediction not found with id: " + id));
    }

    public List<TaxonomicPrediction> searchByAttributes(
            String sampleId,
            String sequenceId,
            String kingdom,
            String phylum,
            String genus,
            String species
    ) {
        // You can add more complex search logic here if needed (e.g., combining criteria).
        if (sampleId != null) {
            return taxonomicPredictionRepository.findBySampleId(sampleId);
        }
        if (sequenceId != null) {
            return taxonomicPredictionRepository.findBySequenceId(sequenceId).map(List::of).orElse(List.of());
        }
        if (kingdom != null) {
            return taxonomicPredictionRepository.findByKingdom(kingdom);
        }
        if (phylum != null) {
            return taxonomicPredictionRepository.findByPhylum(phylum);
        }
        if (genus != null) {
            return taxonomicPredictionRepository.findByGenus(genus);
        }
        if (species != null) {
            return taxonomicPredictionRepository.findBySpecies(species);
        }

        return List.of(); // Return an empty list if no search parameters are provided
    }
}