import styles from "./DescriptionModal.module.scss";
import React, { useRef } from "react";
import { useOnClickOutSide } from "../../hooks/index";

export const DescriptionModal = ({ pokemonData, setIsModalOpen }) => {
  const modalRef = useRef();

  useOnClickOutSide(modalRef, () => setIsModalOpen(false));

  return (
    <div className={styles.descriptionModal}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
            X
          </span>
        </div>
        <div className={styles.description}>
          <p>{pokemonData?.description}</p>
        </div>
      </div>
    </div>
  );
};
