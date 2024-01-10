import "./styles/index.scss";
import "./styles/global.scss";

import React from "react";
import { useRoutes } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const App = () => {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "pokemon/:id", element: <Detail /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);
  return routeElement;
};

export default App;
