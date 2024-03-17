import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonData } from "../type/global.type";
import {
  K_NAME_URL,
  formatPokemonSprites,
  formatStats,
  formatTypes,
  getKoreanData,
  getNextAndPreviousPokemon,
  getPokemonBasicData,
  getPokemonDescription,
} from "../api/api";
import { RootState } from "../store/store";

export const fetchPokemonDetail = createAsyncThunk<
  PokemonData,
  number,
  { state: RootState; rejectValue: string }
>("pokemon/fetchDetail", async (id: number, { getState, rejectWithValue }) => {
  try {
    const pokemonList = (getState() as RootState).pokemon.list;
    const pokemon = pokemonList.find((p: PokemonData) => p.id === id);

    const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
    const description = await getPokemonDescription(id);
    const pokemonDataUrl = "https://pokeapi.co/api/v2/pokemon/" + String(id);

    if (pokemon) {
      return {
        ...pokemon,
        next: nextAndPreviousPokemon.next,
        previous: nextAndPreviousPokemon.previous,
        description,
      } as PokemonData;
    } else {
      const { id, types, weight, height, stats, sprites } = await getPokemonBasicData(
        pokemonDataUrl
      );
      const url = K_NAME_URL.replace("##{id}", String(id));
      const name = await getKoreanData(url);
      const image = sprites.other["official-artwork"].front_default;
      return {
        id,
        name,
        image,
        types: await formatTypes(types),
        weight: weight * 0.1,
        height: height * 0.1,
        stats: formatStats(stats),
        sprites: formatPokemonSprites(sprites),
        next: nextAndPreviousPokemon.next,
        previous: nextAndPreviousPokemon.previous,
        description,
      } as PokemonData;
    }
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});

interface PokemonState {
  detail: PokemonData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  detail: null,
  loading: false,
  error: null,
};

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonData | null>) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "An unknown error occurred";
      });
  },
});

export default pokemonDetailSlice;
