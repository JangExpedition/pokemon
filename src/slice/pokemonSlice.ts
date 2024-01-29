import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { K_NAME_URL, formatPokemonSprites, formatStats, formatTypes, getKoreanData, getNextAndPreviousPokemon, getPokemonBasicData, getPokemonDescription } from "../api/api";
import { PokemonData } from "../type/global.type";
import axios from "axios";

export const fetchPokemonList = createAsyncThunk<PokemonData[], void, { rejectValue: string }>(
    'pokemon/fetchList',
    async (_, { dispatch, getState }) => {
      try {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=15&offset=##{offset}".replace(
          "##{offset}",
          String(getState().pokemon.list.length)
        );
  
        const response = await axios.get(URL);
  
        const basicData: PokemonData[] = await Promise.all(
          response.data.results.map(async (pokemon: { name: string; url: string }) => {
            const { id, types, weight, height, stats, sprites } = await getPokemonBasicData(
              pokemon.url
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
            };
          })
        );
  
        return basicData;
      } catch (error) {
        return dispatch(fetchPokemonList.rejected(error.message));
      }
    }
  );

interface PokemonState {
    list: PokemonData[];
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    list: [],
    loading: false,
    error: null,
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemonList.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemonList.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchPokemonList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});