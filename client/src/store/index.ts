import { createLogger } from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { templateApi } from './slices/api/templateApi.base';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';

// Default redux logger but collapsed
const customLogger = createLogger({
  collapsed: true,
});

// Config for persisting redux state
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [templateApi.reducerPath], // Do not persist api reducer
};

// Combined reducer to persist. ADD TO HERE WHEN WE HAVE NEW REDUCERS
const combinedReducer = combineReducers({
  [templateApi.reducerPath]: templateApi.reducer,
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
});

// Since we are persisting redux state, we need to manually clear it on logout
const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(templateApi.middleware, customLogger),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
