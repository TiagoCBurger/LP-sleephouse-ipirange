import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SleepHouse from "@sleep-house/landing-page";
import PmaxPage from "@sleep-house/landing-page/pmax";
import TempurPage from "@sleep-house/landing-page/tempur";
import "@sleep-house/landing-page/styles.css";
import { cityConfig } from "./city.config";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {pathname.startsWith("/pmax") ? <PmaxPage region={cityConfig} /> : pathname === "/tempur" ? <TempurPage region={cityConfig} /> : <SleepHouse region={cityConfig} />}
  </StrictMode>,
);
