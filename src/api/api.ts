import axios, { AxiosResponse } from "axios";
import { PokemonData, PokemonListType, Sprites } from "../type/global.type";

const K_NAME_URL = "https://pokeapi.co/api/v2/pokemon-species/##{id}/";

class PokemonList implements PokemonListType {
  private static instace: PokemonList;
  private pokemonList: PokemonData[] = [];

  private constructor() {}

  public static getInstance = () => {
    if (!PokemonList.instace) {
      PokemonList.instace = new PokemonList();
    }
    return PokemonList.instace;
  };

  public getPokemonListLength = (): number => {
    return this.pokemonList.length;
  };

  public getPokemonList = (): PokemonData[] => {
    return this.pokemonList;
  };

  public setPokemonList = (list: PokemonData[]) => {
    this.pokemonList = [...this.pokemonList, ...list];
  };

  public getPokemonData = (id: number): PokemonData => {
    return this.pokemonList.filter((pokemon) => pokemon.id === id)[0];
  };
}

const POKEMONLIST = PokemonList.getInstance();

export const getPokemonList = async (): Promise<PokemonData[]> => {
  try {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=15&offset=##{offset}".replace(
      "##{offset}",
      String(POKEMONLIST.getPokemonListLength())
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

    POKEMONLIST.setPokemonList(basicData);
  } catch (error) {
    console.error(error);
  } finally {
    return POKEMONLIST.getPokemonList();
  }
};

const getPokemonBasicData = async (url: string) => {
  return (await axios.get(url)).data;
};

// 포켓몬 한국 이름, 타입을 가져오는 메서드
const getKoreanData = async (url: string) => {
  const response = await axios.get(url);
  return formatKorean(response);
};

// 응답 데이터에서 한글명을 찾는 메서드
const formatKorean = (response: AxiosResponse) => {
  return response.data.names.filter((name: any) => name.language.name === "ko")[0].name;
};

// 포켓몬 타입 형식을 바꿔주는 메서드
const formatTypes = (types: any) => {
  return Promise.all(
    types.map(async (type: any) => {
      return {
        url: type.type.url,
        en: type.type.name,
        ko: await getKoreanData(type.type.url),
      };
    })
  );
};

// 포켓몬 이미지 포맷하는 메서드
const formatPokemonSprites = (sprites: Sprites): string[] => {
  const newSprites: Sprites = { ...sprites };

  const result = Object.keys(sprites)
    .filter((key) => typeof newSprites[key] === "string")
    .map((key) => newSprites[key] as string);

  return result;
};

// 포켓몬 능력치 포맷 메서드
const formatStats = ([statHP, statATK, statDEP, statSTAK, statSDEP, statSPD]: any[]) => [
  { name: "HP", baseStat: statHP.base_stat },
  { name: "공격", baseStat: statATK.base_stat },
  { name: "방어", baseStat: statDEP.base_stat },
  { name: "특수공격", baseStat: statSTAK.base_stat },
  { name: "특수방어", baseStat: statSDEP.base_stat },
  { name: "스피드", baseStat: statSPD.base_stat },
];

export const getPokemonDetailData = async (id: number) => {
  const pokemon = POKEMONLIST.getPokemonData(id);
  const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
  return {
    ...pokemon,
    next: nextAndPreviousPokemon.next,
    previous: nextAndPreviousPokemon.previous,
    description: await getPokemonDescription(id),
  };
};

// 이전, 다음 포켓몬 데이터
const getNextAndPreviousPokemon = async (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${id - 1}`;
  const result = await axios.get(url);

  const nextResponse = result.data.next && (await axios.get(result.data.next));
  const previousResponse = result.data.previous && (await axios.get(result.data.previous));

  const nextData = nextResponse && nextResponse.data.results[0];
  const previousData = previousResponse && previousResponse.data.results[0];

  const next = nextData && {
    en: nextData.name,
    ko: await getKoreanData(K_NAME_URL.replace("##{id}", String(id + 1))),
  };

  const previous = previousData && {
    en: previousData.name,
    ko: await getKoreanData(K_NAME_URL.replace("##{id}", String(id - 1))),
  };

  const results = { next, previous };

  return results;
};

// 포켓몬 설명 가져오는 메서드
const getPokemonDescription = async (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  const response = await axios.get(url);
  const description = filterAndFormatDescription(response.data.flavor_text_entries);

  return description[Math.floor(Math.random() * description.length)];
};

// 포켓몬 한글 설명으로 변경 및 개행 문자 처리하는 메서드
const filterAndFormatDescription = (flavorText: any) => {
  const koreanDescription = flavorText
    ?.filter((text: any) => text.language.name === "ko")
    .map((text: any) => text.flavor_text.replace(/\r|\n|\f/g, " "));

  return koreanDescription;
};
