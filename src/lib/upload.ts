"use server";

import { cloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

/** Upload un fichier vers Cloudinary et retourne l'URL sécurisée. */
export async function uploadImageToCloudinary(file: File, folder = "autodakar/vehicles"): Promise<string> {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1200, height: 900, crop: "limit", quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload échoué"));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

/** Upload plusieurs fichiers et retourne leurs URLs. */
export async function uploadVehicleImages(formData: FormData): Promise<string[]> {
  const files = formData.getAll("imageFiles") as File[];
  const validFiles = files.filter((f) => f instanceof File && f.size > 0);
  if (validFiles.length === 0) return [];
  return Promise.all(validFiles.map((f) => uploadImageToCloudinary(f)));
}

/**
 * Upload public (formulaire « Vendre ma voiture ») — sans session admin.
 * Limité en nombre de fichiers pour éviter les abus.
 */
export async function uploadSellerImages(formData: FormData): Promise<string[]> {
  const files = (formData.getAll("imageFiles") as File[])
    .filter((f) => f instanceof File && f.size > 0)
    .slice(0, 12);
  if (files.length === 0) return [];

  return Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "autodakar/annonces",
            resource_type: "image",
            transformation: [
              { width: 1200, height: 900, crop: "limit", quality: "auto:good", fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error("Upload échoué"));
            resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    })
  );
}
