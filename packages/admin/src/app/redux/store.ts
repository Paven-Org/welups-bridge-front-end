import { configureStore } from '@reduxjs/toolkit';
import { compose } from 'redux';
import RootReducer from './rootReducer';
import RootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication', 'user'],
};
const configStore = () => {
  const history = createBrowserHistory();
  const persistedReducer = persistReducer(persistConfig, RootReducer);
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
        immutableCheck: true,
        serializableCheck: false,
      }).concat(sagaMiddleware);
    },
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(RootSaga);
  return { store, history, persistor };
};
export const { store, history, persistor } = configStore();
export type RootState = ReturnType<typeof store.getState>;
