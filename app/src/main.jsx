import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/rich.css";
import "./styles/cliff.css";

// Each HTML page says which page it is and how far it sits from the site root.
const el = document.getElementById("root");
const d = el.dataset;
window.SITE_PREFIX = d.prefix || "";
const route =
  d.page === "month" ? `/month/${d.n}` :
  d.page === "project" ? `/projects/${d.id}` :
  d.page === "about" ? "/about" : "/";

createRoot(el).render(
  <React.StrictMode>
    <App route={route} />
  </React.StrictMode>
);
