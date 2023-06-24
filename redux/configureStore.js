/* eslint-disable import/no-anonymous-default-export */
import logger from "redux-logger";
import createSagaMiddle from "redux-saga";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

export const store = configureStore({
  reducer: rootReducer,
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          })
            .concat(logger)
            .concat(sagaMiddleware)
      : (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
              ],
            },
          }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default {
  store,
  persistor,
};
