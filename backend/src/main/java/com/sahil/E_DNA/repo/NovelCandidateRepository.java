// NovelCandidateRepository.java
package com.sahil.E_DNA.repo;

import com.sahil.E_DNA.model.NovelCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NovelCandidateRepository extends JpaRepository<NovelCandidate, Long> {
    Optional<NovelCandidate> findByClusterId(String clusterId);
}