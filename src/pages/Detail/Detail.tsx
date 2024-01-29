// Detail.tsx
import styles from "./Detail.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DescriptionModal, DetailSection, PreviousOrNext } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetail } from "../../slice/pokemonDetailSlice";
import { RootState } from "../../store/store";
import { openAndCloseModal } from "../../slice/modalSlice";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const detail = useSelector((state: RootState) => state.pokemonDetail.detail);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPokemonDetail(Number(params.id)));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (detail) {
      setIsLoading(false);
    }
  }, [detail]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h1>...Loading</h1>
      </div>
    );
  }

  const modalHandler = () => {
    // Modal 열고 닫는 로직 추가
    dispatch(openAndCloseModal());
  };

  return (
    <div className={styles.detailPage}>
      {isOpen && detail && (
        <DescriptionModal description={detail.description as string} modalHandler={modalHandler} />
      )}
      {detail && (
        <>
          <div className={`type-back-${detail?.types[0].en} ${styles.typeBackground}`}>
            <Link to={"/"} className={styles.back}>
              {"< 목록"}
            </Link>
            <h1>{detail.name}</h1>
            <span>#{String(detail?.id).padStart(3, "0")}</span>
          </div>
          <img
            className={styles.mainImage}
            src={detail?.image}
            loading="lazy"
            alt={detail?.name}
            onClick={() => modalHandler()}
          ></img>
          <div className={styles.infoContainer}>
            <DetailSection type={"type"} title={""}/>
            <DetailSection type={"descriptionData"} title={"설명"}/>
            <DetailSection type={"data"} title={"정보"}/>
            <DetailSection type={"stat"} title={"기본 능력치"}/>
            <DetailSection type={"sprites"} title={""}/>
          </div>
        </>
      )}
      {detail?.previous && (
        <PreviousOrNext
          type={"previous"}
          id={Number(detail.id) - 1}
          data={detail.previous}
        />
      )}
      {detail?.next && (
        <PreviousOrNext type={"next"} id={Number(detail.id) + 1} data={detail.next} />
      )}
    </div>
  );
};

export default Detail;
