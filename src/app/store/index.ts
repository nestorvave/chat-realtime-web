import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./modules/user.module";
import selectedUserReducer from "./modules/selected-user.module";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const mainReducer = combineReducers({
  users: userReducer,
  selectedUser: selectedUserReducer,
});

const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: ["users"], version: 1 },
  mainReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
