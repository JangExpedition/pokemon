import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app")).render(<App />);
