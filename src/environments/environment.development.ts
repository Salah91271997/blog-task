import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://dev.to/api',
  blogApiUrl: 'https://dev.to/api/articles',
  itemsPerPage: 9,
  cacheTimeout: 10 * 60 * 1000, // 10 minutes
  apiTimeout: 30000, // 30 seconds
};
