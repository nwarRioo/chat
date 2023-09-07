import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { usersSlice } from "./users/users.slice";
import { topicsSlice } from "./topics/topics.slice";

const makeStore = () => {
    return configureStore({
        reducer: {
            users: usersSlice.reducer,
            topics: topicsSlice.reducer 
        }
    });
};

const store = makeStore()
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
