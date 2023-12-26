import "./BaseStat.style.scss";
import React, { useEffect, useRef } from "react";

export const BaseStat = ({ valueStat, nameStat, type }) => {
  const statGauge = useRef(null);

  useEffect(() => {
    const gauge = valueStat * (100 / 255);
    statGauge.current.style.width = gauge + "%";
  }, []);

  return (
    <tr className="BaseStat">
      <th className="name">{nameStat}</th>
      <td className="value">{valueStat}</td>
      <td className="gauge">
        <div className="full-gauge">
          <div className={`stat-gauge ${type}`} ref={statGauge}></div>
        </div>
      </td>
      <td className="max">255</td>
    </tr>
  );
};
