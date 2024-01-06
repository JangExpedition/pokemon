import React from "react";
import styles from "./DetailSection.module.scss";
import { BaseStat, Data, Type } from "../index";

export const DetailSection = ({ type, title, pokemonData }) => {
  if ("type" === type || "sprites" === type) {
    return "type" === type ? (
      <section className={styles[type]}>
        {pokemonData?.types_en.map((type) => (
          <Type key={type} type={type} />
        ))}
      </section>
    ) : (
      <div className={styles[type]}>
        {pokemonData?.sprites.map((sprite) => (
          <img src={sprite} key={sprite} alt="sprite" />
        ))}
      </div>
    );
  } else if ("data" === type || "stat" === type || "descriptionData" === type) {
    return (
      <section className={styles[type]}>
        <h4 className={`${styles.sectionTitle} type-${pokemonData.types_en[0]}`}>{title}</h4>
        {"data" === type ? (
          <div className={styles.oneRow}>
            <Data title={"Weight"} unit={"kg"} data={pokemonData?.weight} />
            <Data title={"Height"} unit={"m"} data={pokemonData?.height} />
            <Data title={"Move"} unit={""} data={pokemonData?.abilities} />
          </div>
        ) : "stat" === type ? (
          <table>
            <tbody>
              {pokemonData?.stats.map((stat) => (
                <BaseStat
                  key={stat.name}
                  valueStat={stat.baseStat}
                  nameStat={stat.name}
                  type={pokemonData?.types_en[0]}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.description}>{pokemonData?.description}</div>
        )}
      </section>
    );
  }
};
