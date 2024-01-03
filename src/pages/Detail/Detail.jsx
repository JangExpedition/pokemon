import styles from "./Detail.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BaseStat, DamageModal, Type, Previous, PreviousOrNext } from "../../components";
import { getPokemonDetailData } from "../../api/api";

const Detail = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    getPokemonData(params.id);
  }, [params]);

  const getPokemonData = (id) => {
    getPokemonDetailData(id).then((result) => {
      setPokemonData(result);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h1>...Loading</h1>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      {isModalOpen && (
        <DamageModal
          setIsModalOpen={setIsModalOpen}
          damageRelations={pokemonData?.damageRelations}
        />
      )}
      <div className={`type-${pokemonData?.types[0]} ${styles.typeBackground}`}>
        <Link to={"/"} className={styles.back}>{`< ${pokemonData?.name?.toUpperCase()}`}</Link>
        <span>#{String(pokemonData?.id).padStart(3, "0")}</span>
      </div>
      <img
        className={styles.mainImage}
        src={pokemonData?.image}
        loading="lazy"
        alt={pokemonData?.name}
        onClick={() => setIsModalOpen(true)}
      ></img>
      <div className={styles.infoContainer}>
        <section className={styles.typeSection}>
          {pokemonData?.types.map((type) => (
            <Type key={type} type={type} />
          ))}
        </section>
        <section className={styles.dataSection}>
          <h4 className={`type-${pokemonData?.types[0]}`}>정보</h4>
          <div className={styles.oneRow}>
            <div className={styles.oneData}>
              <div className={styles.dataTitle}>Weight</div>
              <div>{pokemonData?.weight}kg</div>
            </div>
            <div className={styles.oneData}>
              <div className={styles.dataTitle}>Height</div>
              <div>{pokemonData?.height}m</div>
            </div>
            <div className={styles.oneData}>
              <div className={styles.dataTitle}>Moves</div>
              {pokemonData?.abilities.map((ability) => (
                <div key={ability}>{ability}</div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.statSection}>
          <h4 className={`type-${pokemonData?.types[0]}`}>기본 능력치</h4>
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
        <section className={styles.descriptionSection}>
          <h4 className={`type-${pokemonData?.types[0]}`}>설명</h4>
          <div className={styles.description}>{pokemonData?.description}</div>
        </section>
        <section className={styles.spritesSection}>
          <div className={styles.sprites}>
            {pokemonData?.sprites.map((sprite) => (
              <img src={sprite} key={sprite} alt="sprite" />
            ))}
          </div>
        </section>
      </div>
      {pokemonData?.previous && <PreviousOrNext type={"previous"} data={pokemonData.previous} />}
      {pokemonData?.next && <PreviousOrNext type={"next"} data={pokemonData.next} />}
    </div>
  );
};

export default Detail;
