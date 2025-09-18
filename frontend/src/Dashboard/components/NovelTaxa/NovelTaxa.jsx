import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllNovelTaxa } from '../../../State/ednaSlice';
import { useNavigate } from 'react-router-dom';

const NovelTaxa = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const allNovelTaxa = useAppSelector((state) => state.edna.allNovelTaxa);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);
    const [novalTaxa, setNovelTaxa] = useState([]);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllNovelTaxa());
        }
        setNovelTaxa(allNovelTaxa || []);
    }, [dispatch, status]);

    const handleRowClick = (id) => {
        navigate(`/novel-taxa/${id}`);
    };

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    // if (status === 'failed') {
    //     return <div className='p-6 bg-red-200'>Error: {error}</div>;
    // }

    return (
        <div className='p-6 bg-green-50'>
            <h1 className='text-2xl font-bold mb-4'>Novel Taxa Candidates</h1>
            <p className='mb-4'>View all novel taxa. Click a row for details.</p>

            <div className='overflow-x-auto bg-white rounded shadow-md'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sample ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Cluster ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Confidence</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Closest Known</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {novalTaxa && novalTaxa.map(taxa => (
                            <tr key={taxa.id} className='cursor-pointer hover:bg-gray-100' onClick={() => handleRowClick(taxa.id)}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{taxa.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.sampleId}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.clusterId}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.overallConfidence}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.closestKnownTaxa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NovelTaxa;