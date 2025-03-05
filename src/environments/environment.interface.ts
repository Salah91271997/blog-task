export interface Environment {
  production: boolean;
  apiUrl: string;
  blogApiUrl: string;
  itemsPerPage: number;
  cacheTimeout: number; // in milliseconds
  apiTimeout: number; // in milliseconds
}
