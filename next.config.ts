import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Les photos passent par le corps de la Server Action. Le défaut de Next
      // est 1 Mo : une seule photo de téléphone le dépasse et la requête est
      // rejetée en 413 avant d'atteindre notre code. 4,5 Mo est le plafond
      // imposé par la fonction serverless Vercel, on s'aligne dessus.
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
