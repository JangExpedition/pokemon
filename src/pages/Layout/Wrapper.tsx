import React from "react";
import { WrapperProps } from "./Wrapper.type";

const Wrapper: React.FC<WrapperProps> = ({ as: Comp = "main", className, ...restProps }) => {
  return React.createElement(Comp as React.ElementType, { className, ...restProps });
};

export default Wrapper;
