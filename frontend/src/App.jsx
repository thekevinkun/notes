import React from "react";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./app.css";

import { Home, Login, SignUp } from "./pages";

import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <main>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default App;
