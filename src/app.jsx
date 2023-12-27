import "./styles/index.scss";
import "./styles/global.scss";

import React from "react";
import { useRoutes } from "react-router-dom";

import Layout from "./pages/Layout/Layout";
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";

const App = () => {
  const routeElement = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/pokemon/:id",
          element: <Detail />,
        },
      ],
    },
  ]);
  return routeElement;
};

export default App;
