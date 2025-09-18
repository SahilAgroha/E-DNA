import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAbundanceData } from '../../../State/ednaSlice';
import PhylumBarChart from './PhylumBarChart';
import GenusHeatmap from './GenusHeatmap';

const Abundance = () => {
    const dispatch = useDispatch();
    const abundanceData = useSelector((state) => state.edna.abundanceData);
    const fileAnalysis = useSelector((state) => state.edna.fileAnalysis);
    const status = useSelector((state) => state.edna.status);
    const error = useSelector((state) => state.edna.error);
  console.log("Abundance Data:", abundanceData);
    const fileId = fileAnalysis?.fileId || 'analysis-1758086122092'; // Use a hardcoded ID for initial testing

    useEffect(() => {
        if (fileId && status === 'idle') {
            dispatch(fetchAbundanceData(fileId));
        }
    }, [dispatch, fileId, status]);

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading abundance data...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    return (
        <div className='p-6 bg-green-50'>
            <h1 className='text-2xl font-bold mb-4'>Abundance Analytics</h1>
            <p className='mb-4'>Viewing abundance data for file ID: <strong>{fileId || "N/A"}</strong></p>
            
            {abundanceData ? (
                <div className='mt-6 p-4 bg-white rounded shadow-md'>
                    <h2 className='text-xl font-semibold mb-4'>Abundance Data Visualizations</h2>
                    
                    <div className='my-4'>
                        <h3 className='text-lg font-medium'>Phylum Level Abundance</h3>
                        <PhylumBarChart data={abundanceData.phylumLevel} />
                    </div>

                    <div className='my-4'>
                        <h3 className='text-lg font-medium'>Genus Level Abundance</h3>
                        <GenusHeatmap data={abundanceData.genusLevel} />
                    </div>

                </div>
            ) : (
                <p className='mt-6 text-gray-500'>No abundance data available. Please upload a file to analyze.</p>
            )}
        </div>
    );
};

export default Abundance;