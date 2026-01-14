export interface Artwork {
  id: number;
  title: string | null;
  place_of_origin: string | null;
  artist_display: string | null;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  limit: number;
  total: number;
}

export interface ArtworkResponse {
  data: Artwork[];
  pagination: Pagination;
}
