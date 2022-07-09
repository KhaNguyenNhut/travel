import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  localStorage.setItem("login", true);
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/app/home" />} />
            <Route path="/app/*" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
