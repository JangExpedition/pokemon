import React from "react";
import styles from "./DetailSection.module.scss";
import { Data, Type } from "../index";

export const DetailSection = ({ type, pokemonData }) => {
  if ("type" === type) {
    return (
      <section className={styles[type]}>
        {pokemonData?.types.map((type) => (
          <Type key={type} type={type} />
        ))}
      </section>
    );
  } else if ("data" === type) {
    return (
      <section className={styles[type]}>
        <h4 className={`${styles.sectionTitle} type-${pokemonData.types[0]}`}>정보</h4>
        <div className={styles.oneRow}>
          <Data title={"Weight"} unit={"kg"} data={pokemonData?.weight} />
          <Data title={"Height"} unit={"m"} data={pokemonData?.height} />
          <Data title={"Move"} unit={""} data={pokemonData?.abilities} />
        </div>
      </section>
    );
  }
};
