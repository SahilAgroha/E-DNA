package com.sahil.edna.repository;

import com.sahil.edna.entity.AbundanceData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbundanceDataRepository extends JpaRepository<AbundanceData, Long> {
}