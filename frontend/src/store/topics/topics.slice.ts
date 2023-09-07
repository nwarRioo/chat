import { createSlice } from '@reduxjs/toolkit';
import { topicsApi } from '../../api/topicsApi';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import ITopicsState from './ITopicsState';
import ITopicGetDto from '../../interfaces/ITopic/ITopicGetDto';
import ITopicCreateDto from '../../interfaces/ITopic/ITopicCreateDto';

const namespace = 'topics';

export const getTopics = createAppAsyncThunk(
    `${namespace}/getTopics`,
    async () => {
        return topicsApi.getTopics()
    }
);

export const getTopicById = createAppAsyncThunk(
    `${namespace}/getTopicById`,
    async (id: string) => {
        return topicsApi.getTopicById(id);
    }
);

export const addTopic = createAppAsyncThunk(
    `${namespace}/addTopic`,
    async (topic: ITopicCreateDto) => {
        return topicsApi.addTopic(topic)
    }
);


export const topicsSlice = createSlice({
    name: namespace,
    initialState: {
        topics: [] as ITopicGetDto[],
        detailedTopic: {},
        showError: false,
        errorMessage: '',
        showAddError: false,
        errorAddMessage: ''
    } as ITopicsState,
    reducers: {
        clearErrors(state) {
            state.errorMessage = '';
            state.showError = false;
            state.showAddError = false;
            state.errorAddMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopics.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(getTopics.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    const result = action.payload.result as ITopicGetDto[]
                    state.topics = result;
                } else {
                    state.showError = true;
                }
            })
            .addCase(getTopicById.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(getTopicById.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    const result = action.payload.result as ITopicGetDto
                    state.detailedTopic = result;
                } else {
                    state.showError = true;
                }
            })
            .addCase(addTopic.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(addTopic.fulfilled, (state, action) => {
                if (action.payload.status === 0) {
                    state.showAddError = true;
                    const topic = action.payload.result;
                    if (topic) state.topics.unshift(topic);
                } else {
                    state.showError = false;
                    state.errorMessage = '';
                };
            })

    }
});

export const {
    clearErrors
} = topicsSlice.actions;
