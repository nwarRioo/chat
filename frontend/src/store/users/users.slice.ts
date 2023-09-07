import { createSlice } from '@reduxjs/toolkit';
import IUsersState from './IUsersState';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import IUserCreateDto from '../../interfaces/IUser/IUserCreateDto';
import IUserLoginDto from '../../interfaces/IUser/IUserLoginDto';
import { userApi } from '../../api/usersApi';
import IUserGetDto from '../../interfaces/IUser/IUserGetDto';

const namespace = 'users';

export const login = createAppAsyncThunk(
    `${namespace}/login`,
    async (user: IUserLoginDto) => {
        return userApi.login(user);
    }
);

export const register = createAppAsyncThunk(
    
    `${namespace}/register`,
    async (user: IUserCreateDto) => {
        return userApi.register(user);
    }
);

export const checkToken = createAppAsyncThunk(
    `${namespace}/checkToken`,
    async () => {
        return userApi.checkToken();
    }
);


const initialState: IUsersState = {
    user: {} as IUserGetDto,
    isAuth: false,
    showError: false,
    errorMessage: '',
    loginShowError: false,
    loginErrorMessage: '',
    registerShowError: false,
    registerErrorMessage: ''
}

export const usersSlice = createSlice({
    name: namespace,
    initialState: initialState,
    reducers: {
        initState(state) {
            state = initialState
        },
        clearError(state) {
            state.errorMessage = '';
            state.showError = false;
            state.loginShowError = false;
            state.loginErrorMessage = '';
            state.registerShowError = false;
            state.registerErrorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state) => {
                state.loginShowError = true;
                state.loginErrorMessage = 'Connection error';
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.loginShowError = false;
                    state.loginErrorMessage = '';
                    const user = action.payload.result;
                    state.user = user;
                    if (user) {
                        localStorage.setItem('token', user.token);
                        state.isAuth = true;
                    }
                } else {
                    state.loginShowError = true;
                    state.loginErrorMessage = "Not correct login or password";
                }
            })
            .addCase(register.rejected, (state) => {
                state.registerShowError = true;
                state.registerErrorMessage = 'Connection error';
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.registerShowError = false;
                    state.registerErrorMessage = '';
                    const user = action.payload.result;
                    state.user = user;
                    if (user) {
                        localStorage.setItem('token', user.token);
                        state.isAuth = true;
                    }
                } else {
                    state.registerShowError = true;
                }
            })
            .addCase(checkToken.rejected, (state) => {
                state.showError = true;
                state.errorMessage = 'Connection error';
            })
            .addCase(checkToken.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    const user = action.payload.result;
                    state.user = user;
                    if (user) {
                        state.isAuth = true;
                    } else {
                        state.isAuth = false;
                    }
                } else {
                    state.showError = true;
                }
            });
    }
});

export const {
    initState,
    clearError
} = usersSlice.actions;
