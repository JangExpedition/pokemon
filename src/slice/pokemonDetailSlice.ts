import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonData } from "../type/global.type";
import { K_NAME_URL, formatPokemonSprites, formatStats, formatTypes, getKoreanData, getNextAndPreviousPokemon, getPokemonBasicData, getPokemonDescription } from "../api/api";
import { RootState } from "../store/store";


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

  
export const fetchPokemonDetail = createAsyncThunk<
  { next: string | null; previous: string | null; description: string; }, 
  number, 
  { rejectValue: string }
>(
  'pokemon/fetchDetail',
  async (id: number, { getState, rejectWithValue }) => {
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
        };
      } else {
        const { id, types, weight, height, stats, sprites } = await getPokemonBasicData(pokemonDataUrl);
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
        };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  

const pokemonDetailSlice = createSlice({
    name: 'pokemonDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPokemonDetail.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
          state.loading = false;
          state.detail = action.payload;
        })
        .addCase(fetchPokemonDetail.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default pokemonDetailSlice;