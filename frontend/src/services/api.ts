export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function apiUrl(path: string) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

