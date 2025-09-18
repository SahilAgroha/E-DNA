import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllDiversity } from '../../../State/ednaSlice';
import { useNavigate } from 'react-router-dom';

const DiversityAnalytics = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const allDiversity = useAppSelector((state) => state.edna.allDiversity);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllDiversity());
        }
    }, [dispatch, status]);

    const handleRowClick = (id) => {
        navigate(`/diversity/${id}`);
    };

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    return (
        <div className='p-6 bg-green-50'>
            <h1 className='text-2xl font-bold mb-4'>Diversity Analytics</h1>
            <p className='mb-4'>View and analyze diversity metrics for all samples. Click a row for details.</p>

            <div className='overflow-x-auto bg-white rounded shadow-md'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sample ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Dominant Kingdom</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Shannon Diversity</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Species Richness</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {allDiversity && allDiversity.map(metric => (
                            <tr key={metric.id} className='cursor-pointer hover:bg-gray-100' onClick={() => handleRowClick(metric.id)}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{metric.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{metric.sampleId}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{metric.dominantKingdom}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{metric.shannonDiversity}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{metric.speciesRichness}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiversityAnalytics;