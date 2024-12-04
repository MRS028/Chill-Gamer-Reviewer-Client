import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import Router from './Routes/Router.jsx';
import AuthProvider from "./Provider/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={Router} />

    </AuthProvider>
    
  </StrictMode>
);
