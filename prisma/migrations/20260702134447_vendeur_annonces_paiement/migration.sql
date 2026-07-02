-- CreateEnum
CREATE TYPE "ListingSource" AS ENUM ('ADMIN', 'VENDEUR');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('PAIEMENT_EN_ATTENTE', 'EN_MODERATION', 'PUBLIE', 'REFUSE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('EN_ATTENTE', 'PAYE', 'ECHOUE');

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "moderationStatus" "ModerationStatus" NOT NULL DEFAULT 'PUBLIE',
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "sellerEmail" TEXT,
ADD COLUMN     "sellerName" TEXT,
ADD COLUMN     "sellerPhone" TEXT,
ADD COLUMN     "source" "ListingSource" NOT NULL DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'XOF',
    "status" "PaymentStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "provider" TEXT NOT NULL DEFAULT 'PAYTECH',
    "reference" TEXT NOT NULL,
    "providerToken" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_reference_key" ON "payments"("reference");

-- CreateIndex
CREATE INDEX "payments_vehicleId_idx" ON "payments"("vehicleId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_reference_idx" ON "payments"("reference");

-- CreateIndex
CREATE INDEX "vehicles_moderationStatus_idx" ON "vehicles"("moderationStatus");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
