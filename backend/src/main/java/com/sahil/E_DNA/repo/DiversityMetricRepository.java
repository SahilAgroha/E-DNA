// DiversityMetricRepository.java
package com.sahil.E_DNA.repo;

import com.sahil.E_DNA.model.DiversityMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DiversityMetricRepository extends JpaRepository<DiversityMetric, Long> {
    @Query("SELECT AVG(dm.shannonDiversity) FROM DiversityMetric dm")
    Double getAverageShannonDiversity();

    @Query("SELECT AVG(dm.evenness) FROM DiversityMetric dm")
    Double getAverageEvenness();
}