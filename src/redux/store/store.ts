import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../slices/authSlice";

// Configuration for redux-persist
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persisted reducer for auth
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Combine reducers (if you have more slices, add them here)
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
});

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
