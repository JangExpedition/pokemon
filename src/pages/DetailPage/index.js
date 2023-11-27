import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BaseStat from "../../components/BaseStat";
import DamageModal from "../../components/DamageModal";
import Type from "../../components/Type";

const DetailPage = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    getPokemonData(params.id);
  }, [params]);

  const getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
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

        const formatData = {
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

        setPokemonData(formatData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonDescription = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const response = await axios.get(url);
    const description = filterAndFormatDescription(response.data.flavor_text_entries);

    return description[Math.floor(Math.random() * description.length)];
  };

  const filterAndFormatDescription = (flavorText) => {
    const koreanDescription = flavorText
      ?.filter((text) => text.language.name === "ko")
      .map((text) => text.flavor_text.replace(/\r|\n|\f/g, " "));

    return koreanDescription;
  };

  const formatPokemonSprites = (sprites) => {
    const newSprites = { ...sprites };

    Object.keys(sprites).forEach((key) => {
      if (typeof newSprites[key] !== "string") {
        delete newSprites[key];
      }
    });

    return Object.values(newSprites);
  };

  const formatAbilities = (abilities) => {
    return abilities
      .filter((ability, index) => index <= 1)
      .map((obj) => obj.ability.name.replaceAll("-", " "));
  };

  const formatStats = ([statHP, statATK, statDEP, statSTAK, statSDEP, statSPD]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSTAK.base_stat },
    { name: "Special Defense", baseStat: statSDEP.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

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

  if (isLoading) {
    return (
      <div className="detail-data-loading">
        <h1>...Loading</h1>
      </div>
    );
  }

  return (
    <div className="DetailPage">
      {isModalOpen && (
        <DamageModal
          setIsModalOpen={setIsModalOpen}
          damageRelations={pokemonData?.damageRelations}
        />
      )}
      <div className={`${pokemonData?.types[0]} type-background`}>
        <Link to={"/"} className="back">{`< ${pokemonData?.name?.toUpperCase()}`}</Link>
        <span>#{String(pokemonData?.id).padStart(3, "0")}</span>
      </div>
      <img
        className="main-image"
        src={pokemonData?.image}
        loading="lazy"
        alt={pokemonData?.name}
        onClick={() => setIsModalOpen(true)}
      ></img>
      <div className="info-container">
        <section className="type-section">
          {pokemonData?.types.map((type) => (
            <Type key={type} type={type} />
          ))}
        </section>
        <section className="data-section">
          <h4 className={pokemonData?.types[0]}>정보</h4>
          <div className="one-row">
            <div className="one-data">
              <div className="data-title">Weight</div>
              <div>{pokemonData?.weight}kg</div>
            </div>
            <div className="one-data">
              <div className="data-title">Height</div>
              <div>{pokemonData?.height}m</div>
            </div>
            <div className="one-data">
              <div className="data-title">Moves</div>
              {pokemonData?.abilities.map((ability) => (
                <div key={ability}>{ability}</div>
              ))}
            </div>
          </div>
        </section>
        <section className="stat-section">
          <h4 className={pokemonData?.types[0]}>기본 능력치</h4>
          <table>
            <tbody>
              {pokemonData?.stats.map((stat) => (
                <BaseStat
                  key={stat.name}
                  valueStat={stat.baseStat}
                  nameStat={stat.name}
                  type={pokemonData?.types[0]}
                />
              ))}
            </tbody>
          </table>
        </section>
        <section className="description-section">
          <h4 className={pokemonData?.types[0]}>설명</h4>
          <div className="description">{pokemonData?.description}</div>
        </section>
        <section className="sprites-section">
          <div className="sprites">
            {pokemonData?.sprites.map((sprite) => (
              <img src={sprite} key={sprite} alt="sprite" />
            ))}
          </div>
        </section>
      </div>
      {pokemonData?.previous && (
        <Link className="previous" to={`/pokemon/${pokemonData.previous}`}>
          {"<"}
        </Link>
      )}
      {pokemonData?.next && (
        <Link className="next" to={`/pokemon/${pokemonData.next}`}>
          {">"}
        </Link>
      )}
    </div>
  );
};

export default DetailPage;
