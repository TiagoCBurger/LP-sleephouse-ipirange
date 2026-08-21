import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SleepHouse from "@sleep-house/landing-page";
import PmaxPage from "@sleep-house/landing-page/pmax";
import "@sleep-house/landing-page/styles.css";
import { cityConfig } from "./city.config";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {pathname.startsWith("/pmax") ? <PmaxPage region={cityConfig} /> : <SleepHouse region={cityConfig} />}
  </StrictMode>,
);
