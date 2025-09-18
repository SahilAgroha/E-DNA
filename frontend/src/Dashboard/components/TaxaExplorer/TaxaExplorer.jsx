import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchAllTaxa } from '../../../State/ednaSlice';
import { useNavigate } from 'react-router-dom';

const TaxaExplorer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const allTaxa = useAppSelector((state) => state.edna.allTaxa);
    const status = useAppSelector((state) => state.edna.status);
    const error = useAppSelector((state) => state.edna.error);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllTaxa());
        }
        setFilteredData(allTaxa || []);
    }, [dispatch, status]);

    useEffect(() => {
        if (allTaxa) {
            setFilteredData(allTaxa);
        }
    }, [allTaxa]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (allTaxa) {
            const filtered = allTaxa.filter(taxa => 
                taxa.sampleId.toLowerCase().includes(term) ||
                taxa.sequenceId.toLowerCase().includes(term) ||
                taxa.kingdom.toLowerCase().includes(term) ||
                taxa.phylum.toLowerCase().includes(term)
            );
            setFilteredData(filtered);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/taxa-explorer/${id}`);
    };

    if (status === 'loading') {
        return <div className='p-6 bg-gray-100'>Loading...</div>;
    }

    if (status === 'failed') {
        return <div className='p-6 bg-red-200'>Error: {error}</div>;
    }

    return (
        <div className='p-6 bg-green-50'>
            <h1 className='text-2xl font-bold mb-4'>Taxa Explorer</h1>
            <p className='mb-4'>View all taxonomic predictions. Click a row for details.</p>
            
            <input
                type='text'
                placeholder='Search by Sample, Kingdom, Phylum...'
                value={searchTerm}
                onChange={handleSearch}
                className='w-full p-2 mb-4 border rounded shadow-sm'
            />

            <div className='overflow-x-auto bg-white rounded shadow-md'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sample ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Kingdom</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phylum</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {filteredData && filteredData.map(taxa => (
                            <tr key={taxa.id} className='cursor-pointer hover:bg-gray-100' onClick={() => handleRowClick(taxa.id)}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{taxa.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.sampleId}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.kingdom}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{taxa.phylum}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaxaExplorer;