import styles from "./PreviousOrNext.module.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PreviousOrNextProps } from "./PreviousOrNext.type";

export const PreviousOrNext = ({ id, type, data }: PreviousOrNextProps) => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setLogo(type === "previous" ? `< ${data.ko}` : type === "next" ? `${data.ko} >` : "");
  });

  return (
    <Link className={styles[type]} to={`/pokemon/${id}`}>
      {logo}
    </Link>
  );
};
