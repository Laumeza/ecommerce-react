import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import AppNavBar from "./components/AppNavBar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <AppNavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
