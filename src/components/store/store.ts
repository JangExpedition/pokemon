import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
});

export default store;

export type StoreStateType = ReturnType<typeof store.getState>;
