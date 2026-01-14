import type { ArtworkResponse } from "../types/artwork";

const BASE_URL = import.meta.env.VITE_ARTWORKS_API_BASE_URL;

export async function fetchArtworks(page: number): Promise<ArtworkResponse> {
  const response = await fetch(`${BASE_URL}?page=${page}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ArtworkResponse = await response.json();
  return data;
}
