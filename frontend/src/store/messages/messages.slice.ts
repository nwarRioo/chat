import { createSlice } from '@reduxjs/toolkit';
import { messagesApi } from '../../api/messagesApi';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import IMessageCreateDto from '../../interfaces/IMessage/IMessageCreateDto';
import IMessageGetDto from '../../interfaces/IMessage/IMessageGetDto';
import IMessagesState from './IMessagesState';


const namespace = 'messages';

export const getMessagesByTopicId = createAppAsyncThunk(
    `${namespace}/getMessagesByTopicId`,
    async (topicId: string) => {
        return messagesApi.getMessagesByTopicId(topicId)
    }
);

export const addMessage = createAppAsyncThunk(
    `${namespace}/addMessage`,
    async (message: IMessageCreateDto) => {
        return messagesApi.addMessage(message)
    }
);

export const messagesSlice = createSlice({
    name: namespace,
    initialState: {
        messages: [] as IMessageGetDto[],
        showError: false,
        errorMessage: '',
        showAddError: false,
        errorAddMessage: ''
    } as IMessagesState,
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
            .addCase(getMessagesByTopicId.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(getMessagesByTopicId.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    const result = action.payload.result as IMessageGetDto[]
                    state.messages = result;
                } else {
                    state.showError = true;
                };
            })
            .addCase(addMessage.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                if (action.payload.status === 0) {
                    state.showAddError = true;
                } else {
                    const comment = action.payload.result;
                    if (comment) { 
                        state.messages.unshift(comment);
                    };
                    state.showAddError = false;
                    state.errorAddMessage = '';
                };
            })
    }
});

export const {
    clearErrors
} = messagesSlice.actions;
