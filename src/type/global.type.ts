export interface Type {
  ko: string;
  en: string;
}

export interface Stat {
  name: string;
  baseStat: number;
}

export interface Sprites {
  [key: string]: string;
}

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: Type[];
  weight?: number;
  height?: number;
  stats?: Stat[];
  next?: Type;
  previous?: Type;
  sprites?: string[];
  description?: string;
}
