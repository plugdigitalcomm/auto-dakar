import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AutoDakar — Voitures au Sénégal",
    short_name: "AutoDakar",
    description: "La plateforme premium de vente de voitures neuves et d'occasion au Sénégal.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d4a84b",
    orientation: "portrait-primary",
    lang: "fr",
    categories: ["shopping", "automotive"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Catalogue",
        short_name: "Catalogue",
        description: "Parcourir tous les véhicules",
        url: "/catalogue",
        icons: [{ src: "/icons/icon-96.png", sizes: "96x96" }],
      },
      {
        name: "Nos agents",
        short_name: "Agents",
        description: "Voir nos agents partenaires",
        url: "/agents",
        icons: [{ src: "/icons/icon-96.png", sizes: "96x96" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
  };
}
