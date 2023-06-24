import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import eventsSlice from "./events/eventsSlice";

export const rootReducer = combineReducers({
  eventsData: eventsSlice,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["events"],
};

export default persistReducer(configStorage, rootReducer);
