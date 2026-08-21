import type { SleepHouseRegion } from "@sleep-house/landing-page";

export const cityConfig: SleepHouseRegion = {
  key: "ipiranga",
  label: "Ipiranga e São Caetano",
  location: "Ipiranga e São Caetano",
  domain: import.meta.env.VITE_SITE_URL || "https://www.sleephouseipiranga.com.br",
  whatsapp: "5511985608380",
  stores: [
    {
      name: "Sleep House Ipiranga",
      address: "Av. Nazaré, 550 — Ipiranga, São Paulo — SP",
      mapQuery: "Avenida Nazaré 550 Ipiranga São Paulo",
    },
    {
      name: "Sleep House Nazaré",
      address: "Av. Nazaré, 1736 — Ipiranga, São Paulo — SP",
      mapQuery: "Avenida Nazaré 1736 Ipiranga São Paulo",
    },
    {
      name: "Sleep House Santa Cruz",
      address: "R. Santa Cruz, 2189 — Vila Mariana, São Paulo — SP",
      mapQuery: "Rua Santa Cruz 2189 Vila Mariana São Paulo",
    },
    {
      name: "Sleep House Vergueiro",
      address: "R. Vergueiro, 1910 — Paraíso, São Paulo — SP",
      mapQuery: "Rua Vergueiro 1910 Paraíso São Paulo",
    },
    {
      name: "Sleep House Silva Bueno",
      address: "R. Silva Bueno, 2533 — Loja 18, São Paulo — SP",
      mapQuery: "Rua Silva Bueno 2533 Loja 18 São Paulo",
    },
    {
      name: "Sleep House São Caetano",
      address: "Av. Goiás, 436 — Santo Antônio, São Caetano do Sul — SP",
      mapQuery: "Avenida Goiás 436 Santo Antônio São Caetano do Sul",
    },
    {
      name: "Sleep House Outlet São Caetano",
      address: "Av. Goiás, 750 — Santo Antônio, São Caetano do Sul — SP",
      mapQuery: "Avenida Goiás 750 Santo Antônio São Caetano do Sul",
    },
  ],
};
