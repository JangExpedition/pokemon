import "./Type.style.scss";
import React from "react";

export const Type = ({ type }) => {
  return <span className={`Type ${type}`}>{type}</span>;
};
