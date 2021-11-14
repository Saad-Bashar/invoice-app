import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "./counterSlice";
import invoiceReducer from "./invoiceSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  invoice: invoiceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
