package com.sahil.edna.repository;

import com.sahil.edna.entity.NovelCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelCandidateRepository extends JpaRepository<NovelCandidate, Long> {
}