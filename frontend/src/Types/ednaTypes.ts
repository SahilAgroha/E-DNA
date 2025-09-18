// D:\Project\E-DNA\backend\src\main\java\com\sahil\E_DNA\features\edna\ednaTypes.ts

export interface FileAnalysis {
    id: number;
    fileId: string;
    fileName: string;
    uploadDate: string; // ISO 8601 string
    totalSamples: number;
    totalSequences: number;
    totalTaxaIdentified: number;
    totalNovelCandidates: number;
    taxonomicPredictions: TaxonomicPrediction[];
    novelCandidates: NovelCandidate[];
    diversityMetrics: DiversityMetric[];
}

export interface TaxonomicPrediction {
    id: number;
    sampleId: string;
    sequenceId: string;
    kingdom: string;
    phylum: string;
    genus: string;
    species: string;
    sequenceCount: number;
    overallConfidence: number;
    novelCandidate: boolean;
    // We don't include the 'fileAnalysis' field here due to circular reference handling
}

export interface NovelCandidate {
    id: number;
    clusterId: string;
    sampleId: string;
    sequenceCount: number;
    overallConfidence: number;
    closestKnownTaxa: string;
    geneticDistance: number;
    predictedKingdom: string;
    predictedPhylum: string;
    // We don't include the 'fileAnalysis' field here due to circular reference handling
}

export interface DiversityMetric {
    id: number;
    sampleId: string;
    speciesRichness: number;
    shannonDiversity: number;
    simpsonDiversity: number;
    evenness: number;
    dominantKingdom: string;
    rareTaxaCount: number;
    totalSequences: number;
    // We don't include the 'fileAnalysis' field here due to circular reference handling
}

export interface OverviewSummary {
    totalFiles: number;
    totalSamples: number;
    totalTaxa: number;
    avgShannonDiversity: number;
}

export interface AbundanceData {
    phylumLevel: Array<[string, number]>;
    genusLevel: Array<[string, number]>;
}

export interface EdnaState {
    overview: OverviewSummary | null;
    fileAnalysis: FileAnalysis | null;
    abundanceData: AbundanceData | null;
    novelTaxa: NovelCandidate | null;
    allNovelTaxa: NovelCandidate[] | null;
    taxaData: TaxonomicPrediction | null;
    allTaxa: TaxonomicPrediction[] | null;
    taxaSearchData: TaxonomicPrediction[] | null; 
    diversityData: DiversityMetric | null; // Added for single detail view
    allDiversity: DiversityMetric[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}