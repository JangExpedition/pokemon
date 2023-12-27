import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/index";
import Wrapper from "./Wrapper";

const Layout = () => {
  return (
    <>
      <Header />
      <Wrapper className="main">
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;
