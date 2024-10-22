import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { NotesContextProvider } from "./context/NotesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotesContextProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </NotesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
