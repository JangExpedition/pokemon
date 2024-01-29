import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import { pokemonSlice } from "../slice/pokemonSlice";
import pokemonDetailSlice from "../slice/pokemonDetailSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    pokemon: pokemonSlice.reducer,
    pokemonDetail: pokemonDetailSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
