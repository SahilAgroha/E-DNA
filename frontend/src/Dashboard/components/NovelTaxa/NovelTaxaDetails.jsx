import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchNovelTaxa } from '../../../State/ednaSlice';

const NovelTaxaDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const novelTaxa = useAppSelector((state) => state.edna.novelTaxa);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchNovelTaxa(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    if (!novelTaxa) {
        return <div className='p-6 bg-gray-100'>No data found for this ID.</div>;
    }

    return (
        <div className='p-6 bg-white rounded shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Details for Novel Candidate: {novelTaxa.id}</h1>
            <ul className='space-y-2'>
                <li><strong>Cluster ID:</strong> {novelTaxa.clusterId}</li>
                <li><strong>Sample ID:</strong> {novelTaxa.sampleId}</li>
                <li><strong>Sequence Count:</strong> {novelTaxa.sequenceCount}</li>
                <li><strong>Overall Confidence:</strong> {novelTaxa.overallConfidence}</li>
                <li><strong>Closest Known Taxa:</strong> {novelTaxa.closestKnownTaxa}</li>
                <li><strong>Predicted Kingdom:</strong> {novelTaxa.predictedKingdom}</li>
                <li><strong>Predicted Phylum:</strong> {novelTaxa.predictedPhylum}</li>
            </ul>
        </div>
    );
};

export default NovelTaxaDetail;