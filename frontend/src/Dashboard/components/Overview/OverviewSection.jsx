import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import { Science, Public, BugReport } from '@mui/icons-material';

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

const OverviewSection = ({ overview }) => {
    if (!overview) {
        return (
            <DashboardCard className="p-6">
                <Typography variant="h6" className="text-gray-400">No overview data available.</Typography>
            </DashboardCard>
        );
    }

    const {
        id,
        total_samples_processed,
        total_sequences,
        total_taxa_identified,
        total_novel_candidates,
        average_alpha_diversity,
        kingdom_distribution,
    } = overview;

    return (
        <DashboardCard className="p-6">
            {/* Header with Title and ID */}
            <Box className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Overall Analysis Summary
                </Typography>
                <Typography variant="h6" className="font-bold text-blue-400">
                    ID: {id}
                </Typography>
            </Box>

            {/* Main Metrics Summary */}
            <Box className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-gray-400">
                <Box>
                    <Typography variant="caption" className="text-gray-500 block">Total Samples</Typography>
                    <Typography variant="body1" className="text-white font-bold">{total_samples_processed}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" className="text-gray-500 block">Total Sequences</Typography>
                    <Typography variant="body1" className="text-white font-bold">{total_sequences}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" className="text-gray-500 block">Total Taxa Identified</Typography>
                    <Typography variant="body1" className="text-white font-bold">{total_taxa_identified}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" className="text-gray-500 block">Total Novel Candidates</Typography>
                    <Typography variant="body1" className="text-white font-bold">{total_novel_candidates}</Typography>
                </Box>
            </Box>
            
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Average Alpha Diversity */}
                <Box>
                    <Typography variant="h6" className="font-semibold text-gray-300 mb-2">Average Alpha Diversity</Typography>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-400">
                        <li><strong>Shannon Diversity:</strong> <span className="text-cyan-300 font-bold">{average_alpha_diversity?.avg_shannon}</span></li>
                        <li><strong>Species Richness:</strong> <span className="text-green-300 font-bold">{average_alpha_diversity?.avg_richness}</span></li>
                        <li><strong>Evenness:</strong> <span className="text-purple-300 font-bold">{average_alpha_diversity?.avg_evenness}</span></li>
                    </ul>
                </Box>

                {/* Kingdom Distribution */}
                <Box>
                    <Typography variant="h6" className="font-semibold text-gray-300 mb-2">Kingdom Distribution</Typography>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-400">
                        {kingdom_distribution && Object.entries(kingdom_distribution).map(([kingdom, count]) => (
                            <li key={kingdom} className="flex items-center gap-2">
                                {getKingdomIcon(kingdom)}
                                <span>{kingdom}: <span className="text-cyan-300 font-bold">{count}</span> sequences</span>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </DashboardCard>
    );
};

export default OverviewSection;