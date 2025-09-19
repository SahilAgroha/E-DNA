import React from 'react';
import { Box, Typography, Modal, IconButton, Fade, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import OverviewSection from './OverviewSection';
import DashboardCard from '../TaxaExplorer/DashboardCard';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  maxHeight: '90vh',
  bgcolor: 'rgba(30, 41, 59, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '2px solid',
  borderColor: '#22d3ee',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  color: 'white',
  position: 'relative',
  outline: 'none',
};

const AnalysisDetailModal = ({ isOpen, onClose, analysisData, selectedAnalysisId }) => {
    // Show a loading state if data is not ready or doesn't match the selected ID
    const isDataLoading = !analysisData || analysisData.id !== selectedAnalysisId;

    if (isDataLoading) {
        return (
            <Modal open={isOpen} onClose={onClose} closeAfterTransition>
                <Fade in={isOpen}>
                    <Box sx={{ ...modalStyle, textAlign: 'center', p: 8 }}>
                        <CircularProgress color="primary" />
                        <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>Loading analysis details for ID: {selectedAnalysisId}...</Typography>
                    </Box>
                </Fade>
            </Modal>
        );
    }

    // Now we can safely assume analysisData is the correct data
    const renderDataSection = (title, data) => {
        if (!data || Object.keys(data).length === 0) return null;
        return (
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" className="font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent mb-2">{title}</Typography>
                <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300">
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                            <strong className="text-gray-400">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                            <span className="text-cyan-300 font-bold ml-1">{JSON.stringify(value)}</span>
                        </li>
                    ))}
                </ul>
            </Box>
        );
    };

    return (
        <Modal open={isOpen} onClose={onClose} closeAfterTransition>
            <Fade in={isOpen}>
                <Box sx={modalStyle}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.400', zIndex: 2 }}>
                        <Close />
                    </IconButton>
                    <Typography id="analysis-details-title" variant="h4" className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent" sx={{ fontWeight: 'bold' }}>
                        Full Details for Analysis ID: <Box component="span" sx={{ color: 'info.main' }}>{analysisData.id}</Box>
                    </Typography>

                    <Box id="analysis-details-description" sx={{ mt: 2 }}>
                        <OverviewSection overview={analysisData.overview} />

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" className="font-bold text-gray-200">Abundance Data</Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                                {analysisData.abundance_data && Object.entries(analysisData.abundance_data.summary).map(([sampleId, summary]) => (
                                    <DashboardCard key={sampleId} className="p-4">
                                        <Typography variant="subtitle1" className="font-bold text-gray-300">{sampleId}</Typography>
                                        <Typography variant="body2" className="text-gray-400">Total Sequences: {summary.total_sequences}</Typography>
                                        <Typography variant="body2" className="text-gray-400">Total Taxa: {summary.total_taxa}</Typography>
                                    </DashboardCard>
                                ))}
                            </div>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" className="font-bold text-gray-200">Diversity Analytics</Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {analysisData.diversity_data && (
                                    <>
                                        {renderDataSection("Alpha Diversity", analysisData.diversity_data.alpha_diversity.species_richness)}
                                        {renderDataSection("Beta Diversity", analysisData.diversity_data.beta_diversity)}
                                    </>
                                )}
                            </div>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" className="font-bold text-gray-200">Taxonomic Predictions</Typography>
                            {analysisData.taxonomic_predictions && Object.entries(analysisData.taxonomic_predictions).map(([sampleId, predictions]) => (
                                <Box key={sampleId} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: '8px' }}>
                                    <Typography variant="h6" className="font-bold text-cyan-400">{sampleId}</Typography>
                                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300">
                                        {predictions.map(pred => (
                                            <li key={pred.sequence_id}>
                                                {pred.species} ({pred.genus}) - Confidence: {pred.overall_confidence}
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AnalysisDetailModal;