package com.sahil.edna.repository;

import com.sahil.edna.entity.TaxonomicPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxonomicPredictionRepository extends JpaRepository<TaxonomicPrediction, Long> {
}