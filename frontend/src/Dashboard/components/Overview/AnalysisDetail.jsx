import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAnalysisAsync } from '../../../State/microbiomeSlice';
import { Box, Typography, CircularProgress } from '@mui/material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import DashboardMessageCard from '../TaxaExplorer/DashboardMessageCard';
import OverviewSection from './OverviewSection';
import { BugReport, Public, Science, Water } from '@mui/icons-material';

// Helper function to map kingdom name to a representative icon
const getKingdomIcon = (kingdom) => {
    switch (kingdom) {
        case 'Archaea':
            return <Public sx={{ color: 'yellow.300', fontSize: 20 }} />;
        case 'Eukaryota':
            return <Science sx={{ color: 'cyan.300', fontSize: 20 }} />;
        case 'Bacteria':
            return <BugReport sx={{ color: 'info.main', fontSize: 20 }} />;
        default:
            return <Science sx={{ color: 'grey.400', fontSize: 20 }} />;
    }
};

// Helper function to render a data list with animated cards
const renderDataCards = (data, delayStart = 0) => {
    if (!data || Object.keys(data).length === 0) return null;

    const colorThemes = [
      { mainBg: 'bg-indigo-900/40', text: 'text-indigo-200', accent: 'text-indigo-400', shadow: 'shadow-indigo-500/10', hoverBorder: 'hover:border-indigo-500', animation: 'animate-card-pulse-indigo' },
      { mainBg: 'bg-teal-900/40', text: 'text-teal-200', accent: 'text-teal-400', shadow: 'shadow-teal-500/10', hoverBorder: 'hover:border-teal-500', animation: 'animate-card-pulse-teal' },
      { mainBg: 'bg-purple-900/40', text: 'text-purple-200', accent: 'text-purple-400', shadow: 'shadow-purple-500/10', hoverBorder: 'hover:border-purple-500', animation: 'animate-card-pulse-purple' },
      { mainBg: 'bg-blue-900/40', text: 'text-blue-200', accent: 'text-blue-400', shadow: 'shadow-blue-500/10', hoverBorder: 'hover:border-blue-500', animation: 'animate-card-pulse-blue' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Object.entries(data).map(([key, value], index) => {
                const theme = colorThemes[index % colorThemes.length];
                return (
                    <DashboardCard
                        key={key}
                        className={`
                            p-4 border border-white/10 rounded-2xl shadow-xl
                            transition-all duration-300 transform
                            hover:scale-105 hover:${theme.shadow}
                            relative group
                            ${theme.animation}
                        `}
                        style={{ animationDelay: `${delayStart + index * 100}ms` }}
                    >
                        <Typography variant="subtitle1" className={`font-bold ${theme.accent}`}>{key.replace(/_/g, ' ')}</Typography>
                        <ul className="list-inside mt-2 text-sm text-gray-300 space-y-1">
                            {Object.entries(value).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                    <strong>{subKey.replace(/_/g, ' ')}:</strong>
                                    <span className={`font-bold ml-1 ${theme.text}`}>{subValue}</span>
                                </li>
                            ))}
                        </ul>
                    </DashboardCard>
                );
            })}
        </div>
    );
};

const AnalysisDetail = () => {
    const { analysisId } = useParams();
    const dispatch = useDispatch();
    const { currentAnalysis, status, error } = useSelector((state) => state.microbiome);
    
    useEffect(() => {
        dispatch(fetchAnalysisAsync(analysisId));
    }, [dispatch, analysisId]);

    // Handle loading and error states
    if (status === 'loading' || !currentAnalysis) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'transparent', color: 'grey.200' }}>
                <CircularProgress color="primary" />
                <Typography variant="h5" sx={{ ml: 2 }}>
                    Loading details for analysis ID: {analysisId}...
                </Typography>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <DashboardMessageCard
                title="Error fetching data."
                message={error || 'Please check your network connection or the backend service.'}
            />
        );
    }

    // Helper function to render a data list with animated cards
    const renderDataSection = (title, data) => {
      if (!data || Object.keys(data).length === 0) return null;

      return (
          <DashboardCard className="p-6">
              <Typography variant="h6" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-2">{title}</Typography>
              <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300">
                  {Object.entries(data).map(([key, value]) => (
                      <li key={key}>
                          <strong className="text-gray-400">{key}:</strong>
                          <span className="text-cyan-300 font-bold ml-1">{JSON.stringify(value)}</span>
                      </li>
                  ))}
              </ul>
          </DashboardCard>
      );
    };

    return (
        <Box className="analysis-detail-container p-6">
            <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', mb: 6 }}
                className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
            >
                Detailed Analysis Report
            </Typography>

            {/* Overview Section */}
            <Box className="mb-6">
                <OverviewSection overview={currentAnalysis?.overview} />
            </Box>

            {/* Diversity Metrics Section - Two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Box>
                    <Typography variant="h5" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-4">
                        Alpha Diversity
                    </Typography>
                    {renderDataCards(currentAnalysis.diversity_data.alpha_diversity)}
                </Box>
                <Box>
                    <Typography variant="h5" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-4">
                        Beta Diversity
                    </Typography>
                    {renderDataCards(currentAnalysis.diversity_data.beta_diversity)}
                </Box>
            </div>
            
            {/* Abundance Data Section */}
            {currentAnalysis.abundance_data && (
                <DashboardCard className="p-6 mb-6">
                    <Typography variant="h5" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-4">Abundance Summary</Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                        {Object.entries(currentAnalysis.abundance_data.summary).map(([sampleId, summary]) => (
                            <Box key={sampleId} className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <Typography variant="subtitle1" className="font-bold text-gray-300">{sampleId}</Typography>
                                <Typography variant="body2" className="text-gray-400">Total Sequences: <span className="text-cyan-300 font-bold">{summary.total_sequences}</span></Typography>
                                <Typography variant="body2" className="text-gray-400">Total Taxa: <span className="text-green-300 font-bold">{summary.total_taxa}</span></Typography>
                            </Box>
                        ))}
                    </div>
                </DashboardCard>
            )}

            {/* Taxonomic Predictions Section */}
            {currentAnalysis.taxonomic_predictions && (
                <DashboardCard className="p-6">
                    <Typography variant="h5" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-4">Taxonomic Predictions</Typography>
                    <div className="space-y-4">
                        {Object.entries(currentAnalysis.taxonomic_predictions).map(([sampleId, predictions]) => (
                            <div key={sampleId} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <Typography variant="h6" className="font-bold text-cyan-400">{sampleId}</Typography>
                                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300 mt-2">
                                    {predictions.map((pred) => (
                                        <li key={pred.sequence_id}>
                                            {pred.species} ({pred.genus}) - Confidence: <span className="text-green-300 font-bold">{pred.overall_confidence}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </DashboardCard>
            )}

            {/* Novel Candidates Section */}
            {currentAnalysis.novelCandidates && (
                <DashboardCard className="p-6">
                    <Typography variant="h5" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-4">Novel Candidates</Typography>
                    <div className="space-y-4">
                        {Object.entries(currentAnalysis.novelCandidates).map(([sampleId, candidates]) => (
                            <div key={sampleId} className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <Typography variant="h6" className="font-bold text-cyan-400">{sampleId}</Typography>
                                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300 mt-2">
                                    {candidates.map((cand) => (
                                        <li key={cand.cluster_id}>
                                            Cluster: {cand.cluster_id} - Closest Taxa: <span className="text-yellow-400 font-bold">{cand.closest_known_taxa}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </DashboardCard>
            )}
        </Box>
    );
};

export default AnalysisDetail;