import styles from "./Data.module.scss";

import React from "react";
import { DataProps } from "./Data.type";

export const Data = ({ title, unit, data }: DataProps) => {
  return (
    <div className={styles.oneData}>
      <div className={styles.dataTitle}>{title}</div>
      <div>
        {data.toFixed(1)}
        {unit}
      </div>
    </div>
  );
};
