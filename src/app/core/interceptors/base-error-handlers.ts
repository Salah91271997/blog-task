import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export abstract class BaseErrorHandler {
  constructor(
    protected toasterService: ToasterService,
    protected router?: Router
  ) {}

  abstract handle(error: HttpErrorResponse): void;

  protected getErrorMessage(error: HttpErrorResponse): string {
    return error.error.traceError || 'An error occurred';
  }

  protected navigateTo(path: string): void {
    this.router?.navigate([path]);
  }

  protected clearAuth(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  protected extractValidationErrors(error: HttpErrorResponse): string {
    if (!error.error?.errors) return 'Validation Error';
    const errors = Object.values(error.error.errors);
    return Array.isArray(errors) ? errors.join(', ') : 'Invalid input provided';
  }

  protected logError(error: HttpErrorResponse): void {
    console.error('HTTP Error:', {
      status: error.status,
      message: this.getErrorMessage(error),
      url: error.url,
      timestamp: new Date().toISOString(),
    });
  }
}
