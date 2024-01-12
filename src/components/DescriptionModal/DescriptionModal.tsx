import styles from "./DescriptionModal.module.scss";
import React, { useRef } from "react";
import { useOnClickOutSide } from "../../hooks/index";
import { DescriptionModalProps } from "./DescriptionModal.type";

export const DescriptionModal = ({ description, setIsModalOpen }: DescriptionModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
