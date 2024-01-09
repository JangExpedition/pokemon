import styles from "./PreviousOrNext.module.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PreviousOrNext = ({ type, data }) => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setLogo(type === "previous" ? `< ${data.ko}` : type === "next" ? `${data.ko} >` : "");
  });

  return (
    <Link className={styles[type]} to={`/pokemon/${data.en}`}>
      {logo}
    </Link>
  );
};
