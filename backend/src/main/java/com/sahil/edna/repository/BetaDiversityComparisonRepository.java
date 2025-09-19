package com.sahil.edna.repository;

import com.sahil.edna.entity.BetaDiversityComparison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BetaDiversityComparisonRepository extends JpaRepository<BetaDiversityComparison, Long> {
}