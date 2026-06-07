import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices/testSlice';
import { bybitApi } from './services/bybitApiSlice';
export const makeStore = () =>{
    return configureStore({
        reducer:{
            [counterSlice.name]: counterSlice.reducer,
            [bybitApi.reducerPath]: bybitApi.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bybitApi.middleware),

    });
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];