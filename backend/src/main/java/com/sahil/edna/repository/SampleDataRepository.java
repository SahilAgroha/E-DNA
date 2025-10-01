package com.sahil.edna.repository;

import com.sahil.edna.entity.SampleData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SampleDataRepository extends JpaRepository<SampleData, Long> {
}