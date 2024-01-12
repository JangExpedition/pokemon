import styles from "./Type.module.scss";
import React from "react";
import { TypeProps } from "./Type.type";

export const Type = ({ type }: TypeProps) => {
  return <span className={`${styles.type} type-back-${type.en}`}>{type.ko}</span>;
};
