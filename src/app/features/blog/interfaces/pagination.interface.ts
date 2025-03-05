export interface PaginationParams {
  page: number;
  per_page: number;
  q?: string; // Add optional search query
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems?: number;
}
