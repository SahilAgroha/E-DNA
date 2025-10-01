import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOverviewsAsync } from '../../../State/microbiomeSlice';
import { Box, Typography, CircularProgress } from '@mui/material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import DashboardMessageCard from '../TaxaExplorer/DashboardMessageCard';
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

const Overview = () => {
  const dispatch = useDispatch();
  const { overviews, status, error } = useSelector((state) => state.microbiome);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOverviewsAsync());
    }
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          bgcolor: 'transparent',
          color: 'grey.200',
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h5" sx={{ ml: 2 }}>
          Loading overviews...
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

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', mb: 6 }}
        className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
      >
        Microbiome Analysis Dashboard
      </Typography>

      {overviews && overviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {overviews.map((overview, index) => (
            // The Link component now wraps the DashboardCard
            <Link 
              to={`/analysis/${overview.id}`}
              key={overview.id}
              className="block hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DashboardCard>
                <Box>
                  {/* Header */}
                  <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h5" className="font-bold text-blue-400">
                      Analysis ID: {overview.id}
                    </Typography>
                    <Box className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <Typography variant="caption" className="text-green-300 font-medium">
                        Live
                      </Typography>
                    </Box>
                  </Box>

                  {/* Summary */}
                  <div className="text-gray-400 mt-2 space-y-1">
                    <p>
                      <strong>Total Samples:</strong>{' '}
                      <span className="text-white">{overview.total_samples_processed}</span>
                    </p>
                    <p>
                      <strong>Total Sequences:</strong>{' '}
                      <span className="text-white">{overview.total_sequences}</span>
                    </p>
                    <p>
                      <strong>Total Taxa Identified:</strong>{' '}
                      <span className="text-white">{overview.total_taxa_identified}</span>
                    </p>
                    <p>
                      <strong>Total Novel Candidates:</strong>{' '}
                      <span className="text-white">{overview.total_novel_candidates}</span>
                    </p>
                  </div>

                  {/* Alpha Diversity */}
                  <div className="mt-4 text-sm text-gray-400">
                    <h3 className="font-semibold text-base text-gray-300 mb-2">Average Alpha Diversity</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>
                        <strong>Shannon Diversity:</strong>{' '}
                        <span className="text-cyan-300">{overview.average_alpha_diversity?.avg_shannon}</span>
                      </li>
                      <li>
                        <strong>Species Richness:</strong>{' '}
                        <span className="text-green-300">{overview.average_alpha_diversity?.avg_richness}</span>
                      </li>
                      <li>
                        <strong>Evenness:</strong>{' '}
                        <span className="text-purple-300">{overview.average_alpha_diversity?.avg_evenness}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kingdom Distribution */}
                  <div className="mt-4 text-sm text-gray-400">
                    <h3 className="font-semibold text-base text-gray-300 mb-2">Kingdom Distribution</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {overview.kingdom_distribution &&
                        Object.entries(overview.kingdom_distribution).map(([kingdom, count]) => (
                          <li key={kingdom} className="flex items-center gap-2">
                            {getKingdomIcon(kingdom)}
                            <span>
                              {kingdom}: <span className="text-cyan-300">{count}</span> sequences
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Box>
              </DashboardCard>
            </Link>
          ))}
        </div>
      ) : (
        <DashboardMessageCard
          title="No analyses found."
          message="Please upload a new analysis file to see data."
        />
      )}
    </Box>
  );
};

export default Overview;