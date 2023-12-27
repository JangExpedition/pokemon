import React from "react";

const Wrapper = ({ as: Comp = "main", className, restProps }) => {
  return <Comp className={className} {...restProps} />;
};

export default Wrapper;
