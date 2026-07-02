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
  { name: "BMW", slug: "bmw" },
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
  const bmw = await prisma.brand.findUniqueOrThrow({ where: { slug: "bmw" } });
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

  // ── Véhicules premium ajoutés ──

  const cle53Exists = await prisma.vehicle.findUnique({ where: { slug: "mercedes-cle53-amg-2024-dakar" } });
  if (!cle53Exists) {
    await prisma.vehicle.create({
      data: {
        slug: "mercedes-cle53-amg-2024-dakar",
        title: "Mercedes-Benz CLE 53 AMG 2024",
        brandId: mercedes.id,
        model: "CLE 53 AMG",
        year: 2024,
        condition: "NEUF",
        category: "COUPE",
        price: 85000000,
        isNegotiable: true,
        mileage: 0,
        fuelType: "ESSENCE",
        transmission: "AUTOMATIQUE",
        color: "Noir mat",
        power: 449,
        engineSize: 3.0,
        seats: 4,
        hasAC: true,
        hasGPS: true,
        hasRearCamera: true,
        description: "Mercedes-Benz CLE 53 AMG en finition noir mat saisissante. Moteur 6 cylindres en ligne biturbo de 449 ch, transmission 4MATIC+, 0 à 100 km/h en 3,9 secondes. Intérieur sport AMG, sièges baquet cuir Nappa, système multimédia MBUX dernière génération. Un coupé de prestige rare et exclusif.",
        city: "Dakar",
        status: "DISPONIBLE",
        agentId: medina.id,
        images: { create: [] },
      },
    });
  }

  const gleCoupe1Exists = await prisma.vehicle.findUnique({ where: { slug: "mercedes-gle-coupe-2023-dakar" } });
  if (!gleCoupe1Exists) {
    await prisma.vehicle.create({
      data: {
        slug: "mercedes-gle-coupe-2023-dakar",
        title: "Mercedes-Benz GLE Coupé 2023",
        brandId: mercedes.id,
        model: "GLE Coupé",
        year: 2023,
        condition: "OCCASION",
        category: "SUV",
        price: 62000000,
        isNegotiable: true,
        mileage: 18000,
        fuelType: "DIESEL",
        transmission: "AUTOMATIQUE",
        color: "Gris selenite",
        power: 330,
        engineSize: 3.0,
        seats: 5,
        hasAC: true,
        hasGPS: true,
        hasRearCamera: true,
        description: "Mercedes-Benz GLE Coupé en gris sélénitite, look sport AMG Line. Motorisation diesel 330 ch, boîte 9G-TRONIC, 4MATIC. Toit ouvrant panoramique, jantes AMG 22 pouces, intérieur cuir beige. Première main, carnet d'entretien à jour.",
        city: "Dakar",
        status: "DISPONIBLE",
        agentId: medina.id,
        images: { create: [] },
      },
    });
  }

  const glc63Exists = await prisma.vehicle.findUnique({ where: { slug: "mercedes-glc63s-amg-2024-dakar" } });
  if (!glc63Exists) {
    await prisma.vehicle.create({
      data: {
        slug: "mercedes-glc63s-amg-2024-dakar",
        title: "Mercedes-Benz GLC 63 S AMG 2024",
        brandId: mercedes.id,
        model: "GLC 63 S AMG",
        year: 2024,
        condition: "NEUF",
        category: "SUV",
        price: 95000000,
        isNegotiable: false,
        mileage: 0,
        fuelType: "HYBRIDE",
        transmission: "AUTOMATIQUE",
        color: "Blanc polaire",
        power: 680,
        engineSize: 2.0,
        seats: 5,
        hasAC: true,
        hasGPS: true,
        hasRearCamera: true,
        description: "Mercedes-AMG GLC 63 S E Performance 2024, la référence des SUV haute performance. 680 ch combinés (hybride rechargeable), 0 à 100 km/h en 3,5 secondes. Pack Aéro AMG, diffuseur carbone, freins Céramique. Un SUV de compétition habillé pour la ville.",
        city: "Dakar",
        status: "DISPONIBLE",
        agentId: medina.id,
        images: { create: [] },
      },
    });
  }

  const gle53Exists = await prisma.vehicle.findUnique({ where: { slug: "mercedes-gle53-amg-2023-dakar" } });
  if (!gle53Exists) {
    await prisma.vehicle.create({
      data: {
        slug: "mercedes-gle53-amg-2023-dakar",
        title: "Mercedes-Benz GLE 53 AMG 2023",
        brandId: mercedes.id,
        model: "GLE 53 AMG",
        year: 2023,
        condition: "OCCASION",
        category: "SUV",
        price: 72000000,
        isNegotiable: true,
        mileage: 12000,
        fuelType: "ESSENCE",
        transmission: "AUTOMATIQUE",
        color: "Noir obsidien",
        power: 435,
        engineSize: 3.0,
        seats: 5,
        hasAC: true,
        hasGPS: true,
        hasRearCamera: true,
        description: "Mercedes-AMG GLE 53 4MATIC+ en noir obsidien brillant, aspect full black absolu. Suspension pilotée E-ACTIVE BODY CONTROL, jantes AMG 22\" noir mat, pack Night. Intérieur AMG Performance cuir Nappa bicolore. Un SUV au caractère unique, quasi neuf.",
        city: "Dakar",
        status: "DISPONIBLE",
        agentId: medina.id,
        images: { create: [] },
      },
    });
  }

  const bmwXmExists = await prisma.vehicle.findUnique({ where: { slug: "bmw-xm-2024-dakar" } });
  if (!bmwXmExists) {
    await prisma.vehicle.create({
      data: {
        slug: "bmw-xm-2024-dakar",
        title: "BMW XM 2024",
        brandId: bmw.id,
        model: "XM",
        year: 2024,
        condition: "NEUF",
        category: "SUV",
        price: 110000000,
        isNegotiable: false,
        mileage: 0,
        fuelType: "HYBRIDE",
        transmission: "AUTOMATIQUE",
        color: "Noir saphir",
        power: 653,
        engineSize: 4.4,
        seats: 5,
        hasAC: true,
        hasGPS: true,
        hasRearCamera: true,
        description: "BMW XM 2024, le SUV M le plus puissant jamais produit. Hybride rechargeable V8 4.4L biturbo + moteur électrique pour 653 ch. Design exclusif full black, jantes forgées 23\", intérieur Merino cuir de luxe avec ambient light 5 zones. La définition du SUV de prestige ultime.",
        city: "Dakar",
        status: "DISPONIBLE",
        agentId: medina.id,
        images: { create: [] },
      },
    });
  }
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
