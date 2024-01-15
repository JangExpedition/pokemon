import axios from "axios";
import { PokemonBasicData, PokemonDetailData, Type } from "../type/global.type";

const ALL_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=##{page}&offset=##{offset}";
const DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/##{id}";
const KOREAN_DATA_URL = "https://pokeapi.co/api/v2/pokemon-species/##{id}/";
const LIMIT = 15; // 한 페이지에 보여줄 갯수
let POKEMONLIST: PokemonBasicData[] = [];

// 포켓몬 목록을 가져오는 메서드
export const getPokemonList = async () => {
  let pokemonList = [];
  const url = ALL_POKEMONS_URL.replace("##{page}", String(LIMIT)).replace(
    "##{offset}",
    String(POKEMONLIST.length)
  );
  pokemonList = (await axios.get(url)).data.results;

  const result = await Promise.all(
    pokemonList.map(async (data: any) => {
      const url = data.url;
      const id = await getPokemonId(url);

      const name = await getPokemonKoreanName(id);
      const { image, types } = await getPokemonImageAndTypes(url);

      const pokemon = {
        id,
        name,
        image,
        types,
      };

      return pokemon;
    })
  );

  POKEMONLIST = [...POKEMONLIST, ...result];

  return POKEMONLIST;
};

// 포켓몬 id를 가져오는 메서드
const getPokemonId = async (url: string) => {
  return (await axios.get(url)).data.id;
};

// 포켓몬 한국 이름을 가져오는 메서드
const getPokemonKoreanName = async (id: number) => {
  const url = KOREAN_DATA_URL.replace("##{id}", String(id));
  const response = (await axios.get(url)).data;
  return formatKorean(response);
};

// 포켓몬 카드 디스플레이에 필요한 데이터를 가져오는 메서드
export const getPokemonImageAndTypes = async (url: string) => {
  const response = await axios.get(url);
  return {
    image: response.data.sprites.other["official-artwork"].front_default,
    types: await formatTypes(response.data.types),
  };
};

// 포켓몬 타입 형식을 바꿔주는 메서드
const formatTypes = (types: any) => {
  return Promise.all(
    types.map(async (type: any) => {
      return {
        url: type.type.url,
        en: type.type.name,
        ko: await getPokemonTypeKo(type.type.url),
      };
    })
  );
};

// 포켓몬 한글 타입 가져오는 메서드
export const getPokemonTypeKo = async (url: string) => {
  const response = (await axios.get(url)).data;
  return formatKorean(response);
};

// 응답 데이터에서 한글명을 찾는 메서드
const formatKorean = (response: any) => {
  return response.names.filter((name: any) => name.language.name === "ko")[0].name;
};

/**
 * ==================================================
 * 포켓몬 상세 정보 메서드 모음
 * ==================================================
 */

// 포켓몬 상세정보를 가져오는 메서드
export const getPokemonDetailData = async (id: number): PokemonDetailData => {
  const url = DETAIL_URL.replace("##{id}", String(id));
  const response = await axios.get(url);
  const { weight, height, stats, sprites } = response.data;
  const name = await getPokemonKoreanName(id);
  const { image, types } = await getPokemonImageAndTypes(url);
  const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);

  return {
    id,
    name,
    image,
    types,
    weight: weight * 0.1,
    height: height * 0.1,
    stats: formatStats(stats),
    next: nextAndPreviousPokemon.next,
    previous: nextAndPreviousPokemon.previous,
    sprites: formatPokemonSprites(sprites),
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
    ko: await getPokemonKoreanName(Number(id) + 1),
  };

  const previous = previousData && {
    en: previousData.name,
    ko: await getPokemonKoreanName(Number(id) - 1),
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

// 포켓몬 이미지 포맷하는 메서드
const formatPokemonSprites = (sprites: any) => {
  const newSprites = { ...sprites };

  Object.keys(sprites).forEach((key) => {
    if (typeof newSprites[key] !== "string") {
      delete newSprites[key];
    }
  });

  return Object.values(newSprites);
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
