import axios from "axios";
import "../scss/main.scss";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.results);
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return <h1>Hello World!</h1>;
};
createRoot(document.getElementById("app")).render(<App />);
