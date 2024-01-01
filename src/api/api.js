import axios from "axios";

export const ALL_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
export const DETAIL_URL = "";

export class API {
  url;

  constructor(url) {
    this.url = url;
  }

  async getData() {
    return (await axios.get(this.url)).data.results;
  }
}

export const getAllPokemon = async (url) => {
  return (await axios.get(url)).data.results;
};

export const getPokemonData = async (url) => {
  try {
    const response = await axios.get(url);
    return {
      id: response.data.id,
      image: response.data.sprites.other["official-artwork"].front_default,
      name: response.data.name,
      type: response.data.types[0].type.name,
    };
  } catch (error) {
    console.log(error);
  }
};
