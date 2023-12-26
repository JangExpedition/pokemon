import axios from "axios";

export const POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
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