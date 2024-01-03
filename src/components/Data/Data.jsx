import styles from "./Data.module.scss";

import React, { useEffect } from "react";

export const Data = ({ title, unit, data }) => {
  useEffect(() => {
    console.log(typeof data);
  });
  return (
    <div className={styles.oneData}>
      <div className={styles.dataTitle}>{title}</div>
      {typeof data === "object" ? (
        data.map((ability) => <div key={ability}>{ability}</div>)
      ) : (
        <div>
          {data}
          {unit}
        </div>
      )}
    </div>
  );
};
