import styles from "./BaseStat.module.scss";
import React, { useEffect, useRef } from "react";
import { BaseStatProps } from "./BaseStat.type";

export const BaseStat = ({ valueStat, nameStat, type }: BaseStatProps) => {
  const statGauge = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gauge = valueStat * (100 / 255);
    if (statGauge.current != null) {
      statGauge.current.style.width = gauge + "%";
    }
  }, []);

  return (
    <tr className={styles.BaseStat}>
      <th className={styles.name}>{nameStat}</th>
      <td className={styles.value}>{valueStat}</td>
      <td className={styles.gauge}>
        <div className={styles.fullGauge}>
          <div className={`type-back-${type} ${styles.statGauge}`} ref={statGauge}></div>
        </div>
      </td>
      <td className={styles.max}>255</td>
    </tr>
  );
};
