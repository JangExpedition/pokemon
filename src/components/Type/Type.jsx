import styles from "./Type.module.scss";
import React from "react";

export const Type = ({ type }) => {
  return <span className={`${styles.type} type-back-${type}`}>{type}</span>;
};
