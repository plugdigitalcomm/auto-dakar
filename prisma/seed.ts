import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const BRANDS = [
  { name: "Toyota", slug: "toyota" },
  { name: "Mercedes-Benz", slug: "mercedes-benz" },
  { name: "Hyundai", slug: "hyundai" },
  { name: "Kia", slug: "kia" },
  { name: "Peugeot", slug: "peugeot" },
  { name: "Land Rover", slug: "land-rover" },
] as const;

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@autodakar.sn";
  const password = process.env.ADMIN_PASSWORD ?? "changeme";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "Administrateur Auto Dakar" },
  });
}

async function seedBrands() {
  await Promise.all(
    BRANDS.map((brand) =>
      prisma.brand.upsert({ where: { slug: brand.slug }, update: {}, create: brand }),
    ),
  );
}

async function seedAgents() {
  await prisma.agent.upsert({
    where: { slug: "garage-medina-auto" },
    update: {},
    create: {
      name: "Médina Auto",
      slug: "garage-medina-auto",
      description: "Garage partenaire spécialisé en véhicules SUV et berlines premium.",
      phone: "+221770000001",
      whatsapp: "+221770000001",
      city: "Dakar",
      address: "Avenue Cheikh Anta Diop, Dakar",
      isVerified: true,
    },
  });

  await prisma.agent.upsert({
    where: { slug: "thies-motors" },
    update: {},
    create: {
      name: "Thiès Motors",
      slug: "thies-motors",
      description: "Vente de véhicules d'occasion contrôlés, garantie 3 mois.",
      phone: "+221770000002",
      city: "Thiès",
      isVerified: false,
    },
  });
}

async function seedVehicles() {
  const toyota = await prisma.brand.findUniqueOrThrow({ where: { slug: "toyota" } });
  const mercedes = await prisma.brand.findUniqueOrThrow({ where: { slug: "mercedes-benz" } });
  const hyundai = await prisma.brand.findUniqueOrThrow({ where: { slug: "hyundai" } });
  const medina = await prisma.agent.findUniqueOrThrow({ where: { slug: "garage-medina-auto" } });

  const existing = await prisma.vehicle.findUnique({ where: { slug: "toyota-rav4-2022-dakar" } });
  if (existing) return;

  await prisma.vehicle.create({
    data: {
      slug: "toyota-rav4-2022-dakar",
      title: "Toyota RAV4 2022",
      brandId: toyota.id,
      model: "RAV4",
      year: 2022,
      condition: "OCCASION",
      category: "SUV",
      price: 18500000,
      isNegotiable: true,
      mileage: 32000,
      fuelType: "ESSENCE",
      transmission: "AUTOMATIQUE",
      color: "Gris métallisé",
      power: 203,
      seats: 5,
      hasAC: true,
      hasGPS: true,
      hasRearCamera: true,
      description:
        "Toyota RAV4 en excellent état, entretien suivi, première main. Idéal pour la famille et les routes sénégalaises.",
      city: "Dakar",
      status: "DISPONIBLE",
      agentId: medina.id,
      images: {
        create: [{ url: "https://res.cloudinary.com/demo/image/upload/v1/rav4-1.jpg", position: 0 }],
      },
    },
  });

  await prisma.vehicle.create({
    data: {
      slug: "mercedes-classe-c-2021-dakar",
      title: "Mercedes-Benz Classe C 2021",
      brandId: mercedes.id,
      model: "Classe C",
      year: 2021,
      condition: "OCCASION",
      category: "BERLINE",
      price: 24000000,
      isNegotiable: false,
      mileage: 41000,
      fuelType: "DIESEL",
      transmission: "AUTOMATIQUE",
      color: "Noir",
      power: 194,
      seats: 5,
      hasAC: true,
      hasGPS: true,
      hasRearCamera: false,
      description: "Berline élégante, intérieur cuir, climatisation automatique bi-zone.",
      city: "Dakar",
      status: "DISPONIBLE",
      images: {
        create: [{ url: "https://res.cloudinary.com/demo/image/upload/v1/classe-c-1.jpg", position: 0 }],
      },
    },
  });

  await prisma.vehicle.create({
    data: {
      slug: "hyundai-tucson-2024-neuf",
      title: "Hyundai Tucson 2024 — Neuf",
      brandId: hyundai.id,
      model: "Tucson",
      year: 2024,
      condition: "NEUF",
      category: "SUV",
      price: 21900000,
      isNegotiable: false,
      mileage: 0,
      fuelType: "ESSENCE",
      transmission: "AUTOMATIQUE",
      color: "Blanc nacré",
      power: 156,
      seats: 5,
      hasAC: true,
      hasGPS: true,
      hasRearCamera: true,
      description: "Véhicule neuf, garantie constructeur, disponible immédiatement.",
      city: "Mbour",
      status: "DISPONIBLE",
      images: {
        create: [{ url: "https://res.cloudinary.com/demo/image/upload/v1/tucson-1.jpg", position: 0 }],
      },
    },
  });
}

async function main() {
  await seedAdmin();
  await seedBrands();
  await seedAgents();
  await seedVehicles();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
