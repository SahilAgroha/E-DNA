import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchDiversityData } from '../../../State/ednaSlice';

const DiversityDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const diversityData = useAppSelector((state) => state.edna.diversityData);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchDiversityData(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    if (!diversityData) {
        return <div className='p-6 bg-gray-100'>No data found for this ID.</div>;
    }

    return (
        <div className='p-6 bg-white rounded shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Details for Diversity Metric: {diversityData.id}</h1>
            <ul className='space-y-2'>
                <li><strong>Sample ID:</strong> {diversityData.sampleId}</li>
                <li><strong>Species Richness:</strong> {diversityData.speciesRichness}</li>
                <li><strong>Shannon Diversity:</strong> {diversityData.shannonDiversity}</li>
                <li><strong>Simpson Diversity:</strong> {diversityData.simpsonDiversity}</li>
                <li><strong>Evenness:</strong> {diversityData.evenness}</li>
                <li><strong>Dominant Kingdom:</strong> {diversityData.dominantKingdom}</li>
                <li><strong>Rare Taxa Count:</strong> {diversityData.rareTaxaCount}</li>
                <li><strong>Total Sequences:</strong> {diversityData.totalSequences}</li>
            </ul>
        </div>
    );
};

export default DiversityDetail;