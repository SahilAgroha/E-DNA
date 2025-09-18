import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchTaxaData } from '../../../State/ednaSlice';

const TaxaDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const taxaData = useAppSelector((state) => state.edna.taxaData);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchTaxaData(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    if (!taxaData) {
        return <div className='p-6 bg-gray-100'>No data found.</div>;
    }

    return (
        <div className='p-6 bg-white rounded shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Details for Taxa ID: {taxaData.id}</h1>
            <ul className='space-y-2'>
                <li><strong>Sample ID:</strong> {taxaData.sampleId}</li>
                <li><strong>Sequence ID:</strong> {taxaData.sequenceId}</li>
                <li><strong>Kingdom:</strong> {taxaData.kingdom}</li>
                <li><strong>Phylum:</strong> {taxaData.phylum}</li>
                <li><strong>Genus:</strong> {taxaData.genus}</li>
                <li><strong>Species:</strong> {taxaData.species}</li>
                <li><strong>Sequence Count:</strong> {taxaData.sequenceCount}</li>
                <li><strong>Overall Confidence:</strong> {taxaData.overallConfidence}</li>
            </ul>
        </div>
    );
};

export default TaxaDetail;