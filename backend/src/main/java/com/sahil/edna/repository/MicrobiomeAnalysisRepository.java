package com.sahil.edna.repository;

import com.sahil.edna.entity.MicrobiomeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MicrobiomeAnalysisRepository extends JpaRepository<MicrobiomeAnalysis, Long> {
}