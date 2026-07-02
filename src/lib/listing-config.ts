/** Frais de publication d'une annonce déposée par un particulier (en XOF). */
export const LISTING_FEE_XOF = Number(process.env.LISTING_FEE_XOF ?? 5000);

/** PayTech est actif seulement si les deux clés marchand sont configurées. */
export function isPaytechEnabled(): boolean {
  return Boolean(process.env.PAYTECH_API_KEY && process.env.PAYTECH_API_SECRET);
}
