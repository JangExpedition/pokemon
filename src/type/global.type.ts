export interface Type {
  ko: string;
  en: string;
}

export interface Stat {
  name: string;
  baseStat: number;
}

export interface PokemonBasicData {
  id: number;
  name: string;
  image: string;
  types: Type[];
}

export interface PokemonDetailData {
  id: number;
  name: string;
  image: string;
  types: Type[];
  weight: number;
  height: number;
  stats: Stat[];
  next: Type;
  previous: Type;
  sprites: [];
  description: string;
}
