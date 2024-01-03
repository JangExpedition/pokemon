import styles from "./PreviousOrNext.module.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PreviousOrNext = ({ type, data }) => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    setLogo(type === "previous" ? "<" : type === "next" ? ">" : "");
  });

  return (
    <Link className={styles[type]} to={`/pokemon/${data}`}>
      {logo}
    </Link>
  );
};
