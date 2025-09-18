// D:\Project\E-DNA\backend\src\main\java\com\sahil\E_DNA\features\edna\ednaSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EdnaState, OverviewSummary, FileAnalysis, AbundanceData, NovelCandidate, TaxonomicPrediction, DiversityMetric } from '../Types/ednaTypes';

const initialState: EdnaState = {
    overview: null,
    fileAnalysis: null,
    abundanceData: null,
    novelTaxa: null,
    allNovelTaxa: null,
    taxaData: null,
    allTaxa: null,
    taxaSearchData: null,
    diversityData: null,
    allDiversity: null,
    status: 'idle',
    error: null,
};

const API_BASE_URL = 'http://localhost:8080/api';

// Async thunk to fetch overview data
export const fetchOverviewData = createAsyncThunk<OverviewSummary, void>('edna/fetchOverviewData', async () => {
    const response = await axios.get<OverviewSummary>(`${API_BASE_URL}/dashboard/overview`);
    console.log('API Response - fetchOverviewData:', response.data);
    return response.data;
});

// Async thunk to upload analysis data
export const uploadFile = createAsyncThunk<FileAnalysis, object>('edna/uploadFile', async (jsonData) => {
    const response = await axios.post<FileAnalysis>(`${API_BASE_URL}/data/upload`, jsonData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log('API Response - uploadFile:', response.data);
    return response.data;
});

// Async thunk to fetch abundance data for a specific file
export const fetchAbundanceData = createAsyncThunk<AbundanceData, string>('edna/fetchAbundanceData', async (fileId) => {
    const response = await axios.get<AbundanceData>(`${API_BASE_URL}/dashboard/abundance/${fileId}`);
    console.log('API Response - fetchAbundanceData:', response.data);
    return response.data;
});

// Async thunk to fetch a specific novel taxa record
export const fetchNovelTaxa = createAsyncThunk<NovelCandidate, number>('edna/fetchNovelTaxa', async (id) => {
    const response = await axios.get<NovelCandidate>(`${API_BASE_URL}/dashboard/novel-taxa/${id}`);
    console.log('API Response - fetchNovelTaxa:', response.data);
    return response.data;
});

// Async thunk to fetch a specific taxonomic prediction record
export const fetchTaxaData = createAsyncThunk<TaxonomicPrediction, number>('edna/fetchTaxaData', async (id) => {
    const response = await axios.get<TaxonomicPrediction>(`${API_BASE_URL}/dashboard/taxa/${id}`);
    console.log('API Response - fetchTaxaData:', response.data);
    return response.data;
});

// Async thunk to fetch all taxonomic predictions
export const fetchAllTaxa = createAsyncThunk<TaxonomicPrediction[], void>('edna/fetchAllTaxa', async () => {
    const response = await axios.get<TaxonomicPrediction[]>(`${API_BASE_URL}/dashboard/taxa`);
    console.log('API Response - fetchAllTaxa:', response.data);
    return response.data;
});

export const fetchAllNovelTaxa = createAsyncThunk<NovelCandidate[], void>('edna/fetchAllNovelTaxa', async () => {
    const response = await axios.get<NovelCandidate[]>(`${API_BASE_URL}/dashboard/novel-taxa`);
    console.log('API Response - fetchAllNovelTaxa:', response.data);
    return response.data;
});

export const fetchAllDiversity = createAsyncThunk<DiversityMetric[], void>('edna/fetchAllDiversity', async () => {
    const response = await axios.get<DiversityMetric[]>(`${API_BASE_URL}/dashboard/diversity`);
    console.log('API Response - fetchAllDiversity:', response.data);
    return response.data;
});

export const fetchDiversityData = createAsyncThunk<DiversityMetric, number>('edna/fetchDiversityData', async (id) => {
    const response = await axios.get<DiversityMetric>(`${API_BASE_URL}/dashboard/diversity/${id}`);
    console.log('API Response - fetchDiversityData:', response.data);
    return response.data;
});

export const searchTaxa = createAsyncThunk<TaxonomicPrediction[], {
    sampleId?: string;
    sequenceId?: string;
    kingdom?: string;
    phylum?: string;
    genus?: string;
    species?: string;
}>('edna/searchTaxa', async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get<TaxonomicPrediction[]>(`${API_BASE_URL}/dashboard/taxa/search?${queryString}`);
    console.log('API Response - searchTaxa:', response.data);
    return response.data;
});

const ednaSlice = createSlice({
    name: 'edna',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOverviewData.pending, (state) => {
                state.status = 'loading';
                console.log('Action - fetchOverviewData.pending');
            })
            .addCase(fetchOverviewData.fulfilled, (state, action: PayloadAction<OverviewSummary>) => {
                state.status = 'succeeded';
                state.overview = action.payload;
                console.log('Action - fetchOverviewData.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchOverviewData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch overview data';
                console.log('Action - fetchOverviewData.rejected, Error:', action.error.message);
            })
            .addCase(uploadFile.fulfilled, (state, action: PayloadAction<FileAnalysis>) => {
                state.fileAnalysis = action.payload;
                console.log('Action - uploadFile.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchAbundanceData.fulfilled, (state, action: PayloadAction<AbundanceData>) => {
                state.abundanceData = action.payload;
                console.log('Action - fetchAbundanceData.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchNovelTaxa.fulfilled, (state, action: PayloadAction<NovelCandidate>) => {
                state.novelTaxa = action.payload;
                console.log('Action - fetchNovelTaxa.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchTaxaData.pending, (state) => {
                state.status = 'loading';
                state.taxaData = null;
                console.log('Action - fetchTaxaData.pending');
            })
            .addCase(fetchTaxaData.fulfilled, (state, action: PayloadAction<TaxonomicPrediction>) => {
                state.status = 'succeeded';
                state.taxaData = action.payload;
                console.log('Action - fetchTaxaData.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchTaxaData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch taxa data';
                console.log('Action - fetchTaxaData.rejected, Error:', action.error.message);
            })
            .addCase(fetchAllTaxa.pending, (state) => {
                state.status = 'loading';
                console.log('Action - fetchAllTaxa.pending');
            })
            .addCase(fetchAllTaxa.fulfilled, (state, action: PayloadAction<TaxonomicPrediction[]>) => {
                state.status = 'succeeded';
                state.allTaxa = action.payload;
                console.log('Action - fetchAllTaxa.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchAllTaxa.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch all taxa data';
                console.log('Action - fetchAllTaxa.rejected, Error:', action.error.message);
            })
            .addCase(searchTaxa.pending, (state) => {
                state.status = 'loading';
                state.allTaxa = null;
                console.log('Action - searchTaxa.pending');
            })
            .addCase(searchTaxa.fulfilled, (state, action: PayloadAction<TaxonomicPrediction[]>) => {
                state.status = 'succeeded';
                state.allTaxa = action.payload;
                console.log('Action - searchTaxa.fulfilled, Payload:', action.payload);
            })
            .addCase(searchTaxa.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to search taxa data';
                console.log('Action - searchTaxa.rejected, Error:', action.error.message);
            })
            .addCase(fetchAllNovelTaxa.pending, (state) => {
                state.status = 'loading';
                console.log('Action - fetchAllNovelTaxa.pending');
            })
            .addCase(fetchAllNovelTaxa.fulfilled, (state, action: PayloadAction<NovelCandidate[]>) => {
                state.status = 'succeeded';
                state.allNovelTaxa = action.payload;
                console.log('Action - fetchAllNovelTaxa.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchAllNovelTaxa.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch all novel taxa';
                console.log('Action - fetchAllNovelTaxa.rejected, Error:', action.error.message);
            })
            .addCase(fetchAllDiversity.pending, (state) => {
                state.status = 'loading';
                console.log('Action - fetchAllDiversity.pending');
            })
            .addCase(fetchAllDiversity.fulfilled, (state, action: PayloadAction<DiversityMetric[]>) => {
                state.status = 'succeeded';
                state.allDiversity = action.payload;
                console.log('Action - fetchAllDiversity.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchAllDiversity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch all diversity metrics';
                console.log('Action - fetchAllDiversity.rejected, Error:', action.error.message);
            })
            .addCase(fetchDiversityData.pending, (state) => {
                state.status = 'loading';
                state.diversityData = null;
                console.log('Action - fetchDiversityData.pending');
            })
            .addCase(fetchDiversityData.fulfilled, (state, action: PayloadAction<DiversityMetric>) => {
                state.status = 'succeeded';
                state.diversityData = action.payload;
                console.log('Action - fetchDiversityData.fulfilled, Payload:', action.payload);
            })
            .addCase(fetchDiversityData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch diversity metric';
                console.log('Action - fetchDiversityData.rejected, Error:', action.error.message);
            });
    },
});

export default ednaSlice.reducer;