import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./contacts-action";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const reducerItems = createReducer([], {
  [actions.addItem]: (state, { payload }) => [payload, ...state],
  [actions.removeItem]: (state, { payload }) =>
    state.filter((contact) => contact.name !== payload),
});

const reducerFilter = createReducer("", {
  [actions.filterItem]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items: reducerItems,
  filter: reducerFilter,
});

const contactsPersistConfig = {
  key: "contacts",
  storage,
  blacklist: ["filter"],
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV === "development",
});

const persistor = persistStore(store);

export default { store, persistor };
