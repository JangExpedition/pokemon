import styles from "./Data.module.scss";

import React from "react";

export const Data = ({ title, unit, data }) => {
  return (
    <div className={styles.oneData}>
      <div className={styles.dataTitle}>{title}</div>
      {typeof data === "object" ? (
        data.map((ability) => <div key={ability}>{ability}</div>)
      ) : (
        <div>
          {data.toFixed(1)}
          {unit}
        </div>
      )}
    </div>
  );
};
