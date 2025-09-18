// TaxonomicPredictionRepository.java
package com.sahil.E_DNA.repo;

import com.sahil.E_DNA.model.TaxonomicPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaxonomicPredictionRepository extends JpaRepository<TaxonomicPrediction, Long> {
    List<TaxonomicPrediction> findByFileAnalysisFileId(String fileId);

    @Query("SELECT tp.phylum, SUM(tp.sequenceCount) FROM TaxonomicPrediction tp WHERE tp.fileAnalysis.fileId = :fileId GROUP BY tp.phylum")
    List<Object[]> findAbundanceByPhylum(@Param("fileId") String fileId);

    @Query("SELECT tp.genus, SUM(tp.sequenceCount) FROM TaxonomicPrediction tp WHERE tp.fileAnalysis.fileId = :fileId GROUP BY tp.genus")
    List<Object[]> findAbundanceByGenus(@Param("fileId") String fileId);

    Optional<TaxonomicPrediction> findBySequenceId(String sequenceId);

    // Method to find predictions by Sample ID
    List<TaxonomicPrediction> findBySampleId(String sampleId);


    // Method to find predictions by Kingdom
    List<TaxonomicPrediction> findByKingdom(String kingdom);

    // Method to find predictions by Phylum
    List<TaxonomicPrediction> findByPhylum(String phylum);

    // Method to find predictions by Genus
    List<TaxonomicPrediction> findByGenus(String genus);

    // Method to find predictions by Species
    List<TaxonomicPrediction> findBySpecies(String species);
}