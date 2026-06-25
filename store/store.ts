import { configureStore } from "@reduxjs/toolkit";
import { bybitApi } from "./services/bybitApiSlice";
import { binanceApi } from "./services/binanceApiSlice";
import { huobiApi } from "./services/huobiApiSlice";
import { mexcApi } from "./services/mexcApiSlice";
import { okxApi } from "./services/okxApiSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      [bybitApi.reducerPath]: bybitApi.reducer,
      [binanceApi.reducerPath]: binanceApi.reducer,
      [huobiApi.reducerPath]: huobiApi.reducer,
      [mexcApi.reducerPath]: mexcApi.reducer,
      [okxApi.reducerPath]: okxApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(bybitApi.middleware)
        .concat(binanceApi.middleware)
        .concat(huobiApi.middleware)
        .concat(mexcApi.middleware)
        .concat(okxApi.middleware)
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
