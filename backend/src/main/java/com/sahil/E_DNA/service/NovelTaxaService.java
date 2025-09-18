// NovelTaxaService.java
package com.sahil.E_DNA.service;

import com.sahil.E_DNA.model.NovelCandidate;
import com.sahil.E_DNA.repo.NovelCandidateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NovelTaxaService {
    private final NovelCandidateRepository novelCandidateRepository;

    @Autowired
    public NovelTaxaService(NovelCandidateRepository novelCandidateRepository) {
        this.novelCandidateRepository = novelCandidateRepository;
    }

    public NovelCandidate getNovelCandidateById(Long id) {
        Optional<NovelCandidate> candidate = novelCandidateRepository.findById(id);
        return candidate.orElseThrow(() -> new EntityNotFoundException("Novel Candidate not found with id: " + id));
    }

    public List<NovelCandidate> getAllNovelCandidates() {
        return novelCandidateRepository.findAll();
    }

    public List<NovelCandidate> searchByAttributes(
            String sampleId,
            String clusterId
    ) {
        if (sampleId != null && !sampleId.isBlank()) {
            return novelCandidateRepository.findBySampleId(sampleId);
        }
        if (clusterId != null && !clusterId.isBlank()) {
            return novelCandidateRepository.findByClusterId(clusterId).map(List::of).orElse(List.of());
        }

        return List.of(); // Return an empty list if no search parameters are provided
    }
}