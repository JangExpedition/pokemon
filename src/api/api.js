import axios from "axios";

export const ALL_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=##{page}&offset=0";
export const DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/##{id}";
const LIMIT = 15;

// 포켓몬 목록을 가져오는 메서드
export const getPokemonList = async (page) => {
  const count = LIMIT * page;
  const url = ALL_POKEMONS_URL.replace("##{page}", count);
  return (await axios.get(url)).data.results;
};

// 포켓몬 카드 디스플레이에 필요한 데이터를 가져오는 메서드
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

/**
 * ==================================================
 * 포켓몬 상세 정보 메서드 모음
 * ==================================================
 */

// 포켓몬 상세정보를 가져오는 메서드
export const getPokemonDetailData = async (id) => {
  const url = DETAIL_URL.replace("##{id}", id);

  try {
    const result = await axios.get(url);
    if (result.data) {
      const { name, id, types, weight, height, stats, abilities, sprites } = result.data;
      const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);

      const damageRelations = await Promise.all(
        types.map(async (i) => {
          const type = await axios.get(i.type.url);
          return type.data.damage_relations;
        })
      );

      return {
        id,
        name,
        image: sprites.other["official-artwork"].front_default,
        types: types.map((type) => type.type.name),
        weight: weight / 10,
        height: height / 10,
        stats: formatStats(stats),
        abilities: formatAbilities(abilities),
        next: nextAndPreviousPokemon.next,
        previous: nextAndPreviousPokemon.previous,
        damageRelations,
        sprites: formatPokemonSprites(sprites),
        description: await getPokemonDescription(id),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// 이전, 다음 포켓몬 데이터
const getNextAndPreviousPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${id - 1}`;
  const result = await axios.get(url);

  const nextResponse = result?.data.next && (await axios.get(result?.data.next));
  const previousResponse = result?.data.previous && (await axios.get(result?.data.previous));

  return {
    next: nextResponse?.data?.results[0]?.name,
    previous: previousResponse?.data?.results[0]?.name,
  };
};

// 포켓몬 설명 가져오는 메서드
const getPokemonDescription = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  const response = await axios.get(url);
  const description = filterAndFormatDescription(response.data.flavor_text_entries);

  return description[Math.floor(Math.random() * description.length)];
};

// 포켓몬 한글 설명으로 변경 및 개행 문자 처리하는 메서드
const filterAndFormatDescription = (flavorText) => {
  const koreanDescription = flavorText
    ?.filter((text) => text.language.name === "ko")
    .map((text) => text.flavor_text.replace(/\r|\n|\f/g, " "));

  return koreanDescription;
};

// 포켓몬 이미지 포맷하는 메서드
const formatPokemonSprites = (sprites) => {
  const newSprites = { ...sprites };

  Object.keys(sprites).forEach((key) => {
    if (typeof newSprites[key] !== "string") {
      delete newSprites[key];
    }
  });

  return Object.values(newSprites);
};

// 포켓몬 Move 데이터 포맷 메서드
const formatAbilities = (abilities) => {
  return abilities
    .filter((ability, index) => index <= 1)
    .map((obj) => obj.ability.name.replaceAll("-", " "));
};

// 포켓몬 능력치 포맷 메서드
const formatStats = ([statHP, statATK, statDEP, statSTAK, statSDEP, statSPD]) => [
  { name: "Hit Points", baseStat: statHP.base_stat },
  { name: "Attack", baseStat: statATK.base_stat },
  { name: "Defense", baseStat: statDEP.base_stat },
  { name: "Special Attack", baseStat: statSTAK.base_stat },
  { name: "Special Defense", baseStat: statSDEP.base_stat },
  { name: "Speed", baseStat: statSPD.base_stat },
];
