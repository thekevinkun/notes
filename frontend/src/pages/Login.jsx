import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, PasswordInput } from "../components";

import { IoMdAlert } from "react-icons/io";

import { AuthContext } from "../context/AuthContext";
import { NotesContext } from "../context/NotesContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(NotesContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emptyField, setEmptyField] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setEmptyField(user.emptyField);
    }

    if (response.ok) {
      // Set user obj to global context
      setUser(user);

      setError(null);
      setEmptyField(null);

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(user));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />

      <section className="form">
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <h4 className="form-title">Login</h4>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setError(null);
                setEmptyField(null);
                setUsername(e.target.value);
              }}
              className={`${emptyField === "username" && "input-error"}`}
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setError(null);
                setEmptyField(null);
                setPassword(e.target.value);
              }}
              emptyField={emptyField}
            />

            {error && (
              <div className="error-form">
                <IoMdAlert className="error-alert-icon" />
                <h4>{error}</h4>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-full"
              disabled={isLoading ? true : false}
            >
              Log In
            </button>

            <p className="form-info">
              Not registered yet? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
