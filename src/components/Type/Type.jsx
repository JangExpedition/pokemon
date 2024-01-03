import styles from "./Type.module.scss";
import React from "react";

export const Type = ({ type }) => {
  return <span className={`${styles.type} type-${type}`}>{type}</span>;
};
