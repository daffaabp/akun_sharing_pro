import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppNumber(phone: string | null | undefined): string | null {
  if (!phone) return null;
  // Hapus semua karakter yang BUKAN angka (seperti spasi, dash, kurung, lambang plus)
  let clean = phone.replace(/\D/g, "");
  // Otomatis convert 0 paling depan menjadi 62 untuk whatsapp standar indonesia
  if (clean.startsWith("0")) {
    clean = "62" + clean.substring(1);
  }
  return clean || null;
}
