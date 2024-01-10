import styles from "./Detail.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { DescriptionModal, PreviousOrNext } from "../../components";
import { getPokemonDetailData } from "../../api/api";
import { DetailSection } from "../../components/DetailSection/DetailSection";

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
        <DescriptionModal pokemonData={pokemonData} setIsModalOpen={setIsModalOpen} />
      )}
      <div className={`type-back-${pokemonData?.types[0].en} ${styles.typeBackground}`}>
        <Link to={"/"} className={styles.back}>
          {"< 목록"}
        </Link>
        <h1>{pokemonData.name}</h1>
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
        <DetailSection type={"type"} title={""} pokemonData={pokemonData} />
        <DetailSection type={"descriptionData"} title={"설명"} pokemonData={pokemonData} />
        <DetailSection type={"data"} title={"정보"} pokemonData={pokemonData} />
        <DetailSection type={"stat"} title={"기본 능력치"} pokemonData={pokemonData} />
        <DetailSection type={"sprites"} title={""} pokemonData={pokemonData} />
      </div>
      {pokemonData?.previous && (
        <PreviousOrNext
          type={"previous"}
          id={Number(pokemonData.id) - 1}
          data={pokemonData.previous}
        />
      )}
      {pokemonData?.next && (
        <PreviousOrNext type={"next"} id={Number(pokemonData.id) + 1} data={pokemonData.next} />
      )}
    </div>
  );
};

export default Detail;
