import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

import React from "react";

const PageNotFound = () => {
  return (
    <div className={styles.page}>
      <h1>404 페이지를 찾을 수 없습니다.</h1>
      <Link to={"/"}>메인 페이지로 이동하시겠습니까?</Link>
    </div>
  );
};

export default PageNotFound;
