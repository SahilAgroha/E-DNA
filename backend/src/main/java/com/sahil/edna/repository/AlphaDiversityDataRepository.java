package com.sahil.edna.repository;

import com.sahil.edna.entity.AlphaDiversityData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlphaDiversityDataRepository extends JpaRepository<AlphaDiversityData, Long> {
}