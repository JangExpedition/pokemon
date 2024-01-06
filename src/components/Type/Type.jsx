import styles from "./Type.module.scss";
import React from "react";

export const Type = ({ type_en, type_ko }) => {
  return <span className={`${styles.type} type-back-${type_en}`}>{type_ko}</span>;
};
