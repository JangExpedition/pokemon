import React from "react";
import styles from "./DetailSection.module.scss";
import { BaseStat, Data, Type } from "../index";
import { DetailSectionProps } from "./DetailSection.type";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PokemonData } from "../../type/global.type";

export const DetailSection = ({ type, title }: DetailSectionProps) => {
  const pokemonData = useSelector((state: RootState)=>state.pokemonDetail.detail) as PokemonData;

  if ("type" === type || "sprites" === type) {
    return "type" === type ? (
      <section className={styles[type]}>
        {pokemonData?.types.map((type) => (
          <Type key={type.en} type={type} />
        ))}
      </section>
    ) : (
      <div className={styles[type]}>
        {pokemonData?.sprites?.map((sprite) => (
          <img className={styles.sprite} src={sprite} key={sprite} alt="sprite" />
        ))}
      </div>
    );
  } else if ("data" === type || "stat" === type) {
    return (
      <section className={styles[type]}>
        <h4 className={`${styles.sectionTitle} type-${pokemonData.types[0].en}`}>{title}</h4>
        {"data" === type ? (
          <div className={styles.oneRow}>
            <Data title={"몸무게"} unit={"kg"} data={pokemonData?.weight} />
            <Data title={"키"} unit={"m"} data={pokemonData?.height} />
          </div>
        ) : (
          <table>
            <tbody>
              {pokemonData?.stats.map((stat) => (
                <BaseStat
                  key={stat.name}
                  valueStat={stat.baseStat}
                  nameStat={stat.name}
                  type={pokemonData?.types[0].en}
                />
              ))}
            </tbody>
          </table>
        )}
      </section>
    );
  }
};
