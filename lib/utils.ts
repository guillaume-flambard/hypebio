import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use current path
    return '';
  }
  
  // SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
