import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOverviewsAsync, fetchAnalysisAsync } from '../../../State/microbiomeSlice';
import { Select, MenuItem, FormControl, InputLabel, CircularProgress, Box, Typography, Button } from '@mui/material';
import { BugReport, Water, Science } from '@mui/icons-material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import DashboardMessageCard from '../TaxaExplorer/DashboardMessageCard';

// Array of vibrant color themes for the cards
const colorThemes = [
  { mainBg: 'bg-indigo-900/40', text: 'text-indigo-200', accent: 'text-indigo-400', shadow: 'shadow-indigo-500/10', hoverBorder: 'hover:border-indigo-500' },
  { mainBg: 'bg-teal-900/40', text: 'text-teal-200', accent: 'text-teal-400', shadow: 'shadow-teal-500/10', hoverBorder: 'hover:border-teal-500' },
  { mainBg: 'bg-purple-900/40', text: 'text-purple-200', accent: 'text-purple-400', shadow: 'shadow-purple-500/10', hoverBorder: 'hover:border-purple-500' },
  { mainBg: 'bg-blue-900/40', text: 'text-blue-200', accent: 'text-blue-400', shadow: 'shadow-blue-500/10', hoverBorder: 'hover:border-blue-500' },
];

// Array of colors for the dropdown list items
const menuItemColors = [
    '#22d3ee', '#4ade80', '#c084fc', '#f87171', '#fbbf24'
];

// Helper function to get a consistent icon for novel candidates
const getNovelTaxaIcon = (confidence) => {
  if (confidence > 0.6) return <Science sx={{ color: 'green.300' }} />;
  return <BugReport sx={{ color: 'warning.main' }} />;
};

const NovalTaxa = () => {
  const dispatch = useDispatch();
  const { overviews, currentAnalysis, status, error } = useSelector((state) => state.microbiome);
  
  const [selectedAnalysisId, setSelectedAnalysisId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOverviewsAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedAnalysisId) {
      dispatch(fetchAnalysisAsync(selectedAnalysisId));
      setCurrentPage(1);
    }
  }, [dispatch, selectedAnalysisId]);

  const handleAnalysisChange = (event) => {
    const id = event.target.value;
    setSelectedAnalysisId(id);
  };

  const renderNovelCandidates = () => {
    if (!currentAnalysis?.novel_candidates || Object.keys(currentAnalysis.novel_candidates).length === 0) {
      return (
        <DashboardMessageCard 
          title="No novel candidates found for this analysis."
        />
      );
    }

    const allCandidates = Object.values(currentAnalysis.novel_candidates).flatMap(candidates => candidates);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allCandidates.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allCandidates.length / itemsPerPage);

    return (
      <Box>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentItems.map((candidate, index) => {
            const theme = colorThemes[index % colorThemes.length];
            return (
              <div 
                key={candidate.cluster_id}
                className={`
                  ${theme.mainBg} border-2 border-white/10 rounded-2xl p-6 shadow-2xl
                  transition-all duration-300 transform 
                  ${theme.hoverBorder} hover:scale-105 hover:${theme.shadow}
                  relative group
                `}
              >
                <Box className="flex items-center justify-between mb-4">
                  <Box className="flex items-center gap-2">
                    {getNovelTaxaIcon(candidate.overall_confidence)}
                    <Typography variant="subtitle1" className={`${theme.accent} font-bold`}>Cluster: {candidate.cluster_id}</Typography>
                  </Box>
                  <Typography variant="body2" className={`font-semibold text-yellow-400`}>
                    Novel
                  </Typography>
                </Box>

                <Typography variant="h6" className={`${theme.text} font-bold mb-1`}>{candidate.predicted_kingdom}</Typography>
                <Typography variant="body2" className="text-gray-400 mb-4">Phylum: {candidate.predicted_phylum}</Typography>
                
                <Box className="grid grid-cols-1 gap-2 text-sm">
                  <Box>
                    <Typography variant="caption" className="text-gray-500 block">Closest Known Taxa</Typography>
                    <Typography variant="body2" className={`${theme.accent}`}>{candidate.closest_known_taxa}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" className="text-gray-500 block">Overall Confidence</Typography>
                    <Typography variant="body2" className={`${theme.text}`}>{candidate.overall_confidence?.toFixed(3)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" className="text-gray-500 block">Genetic Distance</Typography>
                    <Typography variant="body2" className={`${theme.text}`}>{candidate.genetic_distance?.toFixed(3)}</Typography>
                  </Box>
                </Box>
              </div>
            );
          })}
        </div>
        
        {/* Pagination Controls */}
        {allCandidates.length > itemsPerPage && (
          <Box className="flex justify-center items-center mt-8">
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              sx={{
                color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'white' }
              }}
            >
              Previous
            </Button>
            <Typography variant="body1" sx={{ mx: 2, color: 'grey.300' }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              sx={{
                color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'white' }
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'transparent', color: 'grey.200' }}>
        <CircularProgress color="primary" />
        <Typography variant="h5" sx={{ ml: 2 }}>Loading data...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <DashboardMessageCard 
        title="Error fetching data."
        message="Please check your network connection or the backend service."
      />
    );
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      {/* Redesigned Header Section with Dropdown on the left */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', mb: 6, gap: { xs: 2, md: 0 } }}>
        
        {/* Title Box on the right */}
        <div>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }} className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Novel Taxa
          </Typography>
          <Typography className="text-gray-400 text-sm mt-1">Explore newly discovered or unclassified organisms</Typography>
        </div>

        {/* Dropdown Card on the left */}
        <DashboardCard 
                  className={`mb-1 p-1 md:p-1 lg:p-1 flex items-center justify-between
                    transition-all duration-300 ease-in-out
                    ${isDropdownOpen ? 'running-border' : 'running-border'}
                  `}
        >
          <FormControl 
            variant="filled" 
            sx={{ 
              minWidth: 240, 
              width: 350,
              bgcolor: 'transparent', 
              borderRadius: 1,
              '& .MuiFilledInput-root': {
                  bgcolor: 'transparent !important',
                  '&:hover': {
                      bgcolor: 'rgba(0, 188, 212, 0.2) !important',
                      color: 'cyan.300',
                      fontWeight: 'bold',
                  },
                  '&.Mui-focused': {
                      bgcolor: 'rgba(255, 255, 255, 0.05) !important',
                  },
                  '&::before, &::after': {
                      display: 'none',
                  },
              },
              '& .MuiInputLabel-filled': {
                  color: 'grey.400',
                  '&.Mui-focused': {
                      color: 'cyan.300',
                  },
              },
              '& .MuiSelect-select': {
                  color: 'white',
                  paddingRight: '32px !important',
              },
              '& .MuiSvgIcon-root': {
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              },
              '& .MuiMenu-paper': {
                  bgcolor: 'rgba(30, 41, 59, 0.9) !important',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
              },
              '& .MuiMenuItem-root': {
                  color: 'grey.300',
                  '&:hover': {
                      bgcolor: 'rgba(0, 188, 212, 0.1) !important',
                      color: 'cyan.300',
                  },
                  '&.Mui-selected': {
                      bgcolor: 'rgba(0, 188, 212, 0.2) !important',
                      color: 'cyan.300',
                      fontWeight: 'bold',
                  },
              },
            }}
          >
            <InputLabel id="analysis-select-label">Select Analysis</InputLabel>
            <Select
              labelId="analysis-select-label"
              id="analysis-select"
              value={selectedAnalysisId}
              onChange={handleAnalysisChange}
              onOpen={() => setIsDropdownOpen(true)}
              onClose={() => setIsDropdownOpen(false)}
              label="Select Analysis"
              MenuProps={{
                  PaperProps: {
                      sx: {
                          marginTop: '8px',
                      },
                  },
                  TransitionProps: {
                      timeout: 200,
                  },
              }}
            >
              <MenuItem value="">
                <em>-- Select an Analysis --</em>
              </MenuItem>
              {overviews?.map((overview, index) => {
                  const color = menuItemColors[index % menuItemColors.length];
                  return (
                    <MenuItem 
                      key={overview.id} 
                      value={overview.id}
                      sx={{ 
                        color: color, 
                        '&.Mui-selected': { 
                          bgcolor: `${color}40 !important`,
                          color: color, 
                          fontWeight: 'bold' 
                        }
                      }}
                    >
                      Analysis ID: {overview.id}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </DashboardCard>
        
        
      </Box>

      {selectedAnalysisId ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'grey.200' }}>
            Novel Candidates for Analysis ID: <Box component="span" sx={{ color: 'info.main' }}>{selectedAnalysisId}</Box>
          </Typography>
          {renderNovelCandidates()}
        </Box>
      ) : (
        <DashboardMessageCard 
          title="Please select an analysis from the dropdown to explore novel taxa."
        />
      )}
    </Box>
  );
};

export default NovalTaxa;