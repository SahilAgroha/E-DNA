// FileAnalysisRepository.java
package com.sahil.E_DNA.repo;

import com.sahil.E_DNA.model.FileAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FileAnalysisRepository extends JpaRepository<FileAnalysis, Long> {
    Optional<FileAnalysis> findByFileId(String fileId);

    @Query("SELECT SUM(fa.totalTaxaIdentified) FROM FileAnalysis fa")
    Long sumTotalTaxaIdentified();

    @Query("SELECT SUM(fa.totalSamples) FROM FileAnalysis fa")
    Long sumTotalSamples();

    @Query("SELECT SUM(fa.totalSequences) FROM FileAnalysis fa")
    Long sumTotalSequences();

    @Query("SELECT SUM(fa.totalNovelCandidates) FROM FileAnalysis fa")
    Long sumTotalNovelCandidates();
}