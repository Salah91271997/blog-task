import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private env: Environment = environment;

  get isProduction(): boolean {
    return this.env.production;
  }

  get apiUrl(): string {
    return this.env.apiUrl;
  }

  get blogApiUrl(): string {
    return this.env.blogApiUrl;
  }

  get itemsPerPage(): number {
    return this.env.itemsPerPage;
  }

  get cacheTimeout(): number {
    return this.env.cacheTimeout;
  }

  get apiTimeout(): number {
    return this.env.apiTimeout;
  }

  // Helper method to build full URLs
  getFullApiUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }
}
