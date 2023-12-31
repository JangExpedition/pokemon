import styles from "./BaseStat.module.scss";
import React, { useEffect, useRef } from "react";

export const BaseStat = ({ valueStat, nameStat, type }) => {
  const statGauge = useRef(null);

  useEffect(() => {
    const gauge = valueStat * (100 / 255);
    statGauge.current.style.width = gauge + "%";
  }, []);

  return (
    <tr className={styles.BaseStat}>
      <th className={styles.name}>{nameStat}</th>
      <td className={styles.value}>{valueStat}</td>
      <td className={styles.gauge}>
        <div className={styles.fullGauge}>
          <div className={styles.statGauge} ref={statGauge}></div>
        </div>
      </td>
      <td className={styles.max}>255</td>
    </tr>
  );
};
