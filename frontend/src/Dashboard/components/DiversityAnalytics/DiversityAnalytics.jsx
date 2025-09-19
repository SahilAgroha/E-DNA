import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOverviewsAsync, fetchAnalysisAsync } from '../../../State/microbiomeSlice';
import { Select, MenuItem, FormControl, InputLabel, CircularProgress, Box, Typography } from '@mui/material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
import DashboardMessageCard from '../TaxaExplorer/DashboardMessageCard';
import AlphaDiversityChart from './AlphaDiversityChart';
import BetaDiversityChart from './BetaDiversityChart';
import SampleSummaryGrid from './SampleSummaryGrid';

const DiversityAnalytics = () => {
    const dispatch = useDispatch();
    const { overviews, currentAnalysis, status, error } = useSelector((state) => state.microbiome);
    
    const [selectedAnalysisId, setSelectedAnalysisId] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchOverviewsAsync());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (selectedAnalysisId) {
            dispatch(fetchAnalysisAsync(selectedAnalysisId));
        }
    }, [dispatch, selectedAnalysisId]);

    const handleAnalysisChange = (event) => {
        const id = event.target.value;
        setSelectedAnalysisId(id);
    };

    const renderDiversityContent = () => {
        if (!currentAnalysis?.diversity_data) {
            return (
                <DashboardMessageCard 
                    title="No diversity data available for this analysis."
                />
            );
        }

        return (
            <Box>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    {/* Alpha Diversity Chart Section - Left Side */}
                    <Box>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200">
                            Alpha Diversity
                        </h2>
                        {currentAnalysis.diversity_data.alpha_diversity ? (
                            <AlphaDiversityChart 
                                alphaData={currentAnalysis.diversity_data.alpha_diversity} 
                            />
                        ) : (
                            <DashboardCard>
                                <Typography variant="h6" className="text-gray-400">No Alpha Diversity data available.</Typography>
                            </DashboardCard>
                        )}
                    </Box>
                    
                    {/* Beta Diversity Chart Section - Right Side */}
                    <Box>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200 pt-20">
                            Beta Diversity
                        </h2>
                        {currentAnalysis.diversity_data.beta_diversity ? (
                            <BetaDiversityChart 
                                betaData={currentAnalysis.diversity_data.beta_diversity} 
                            />
                        ) : (
                            <DashboardCard>
                                <Typography variant="h6" className="text-gray-400">No Beta Diversity data available.</Typography>
                            </DashboardCard>
                        )}
                    </Box>
                </div>

                {/* Sample Summary Grid Section - Below Charts */}
                <SampleSummaryGrid sampleSummaryData={currentAnalysis.diversity_data.sample_summary} />
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
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', mb: 6, gap: { xs: 2, md: 0 } }}>
                
                
                <div>
                          
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }} className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        Diversity Analytics
                    </Typography>
                    <Typography className="text-gray-400 text-sm mt-1">Visualize diversity metrics across samples</Typography>
                </div>
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
                        <Select value={selectedAnalysisId} onChange={handleAnalysisChange} onOpen={() => setIsDropdownOpen(true)} onClose={() => setIsDropdownOpen(false)}
                            label="Select Analysis" MenuProps={{ PaperProps: { sx: { marginTop: '8px' } }, TransitionProps: { timeout: 200 } }}>
                            <MenuItem value=""><em>-- Select an Analysis --</em></MenuItem>
                            {overviews?.map(overview => {
                                const menuItemColors = ['#22d3ee', '#4ade80', '#c084fc', '#f87171', '#fbbf24'];
                                const color = menuItemColors[Math.floor(Math.random() * menuItemColors.length)]; // Random color for each item
                                return (
                                  <MenuItem key={overview.id} value={overview.id} sx={{ color: color, '&.Mui-selected': { bgcolor: `${color}40 !important`, color: color, fontWeight: 'bold' } }}>
                                    Analysis ID: {overview.id}
                                  </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </DashboardCard>
            </Box>

            {selectedAnalysisId && currentAnalysis ? (
                renderDiversityContent()
            ) : (
                <DashboardMessageCard title="Please select an analysis and sample to view diversity metrics." />
            )}
        </Box>
    );
};

export default DiversityAnalytics;