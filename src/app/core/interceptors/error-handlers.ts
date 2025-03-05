import { Injectable } from '@angular/core';
import { BaseErrorHandler } from './base-error-handlers';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Injectable({ providedIn: 'root' })
export class BadRequestHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(this.getErrorMessage(error), 'Error');
  }
}

@Injectable({ providedIn: 'root' })
export class UnauthorizedHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService, router: Router) {
    super(toasterService, router);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(
      'Your session has expired. Please login again.',
      'Session Expired'
    );
    this.clearAuth();
    this.navigateTo('/login');
  }
}

@Injectable({ providedIn: 'root' })
export class ForbiddenHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService, router: Router) {
    super(toasterService, router);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(
      "You don't have permission to access this resource",
      'Access Denied'
    );
    this.navigateTo('/');
  }
}

@Injectable({ providedIn: 'root' })
export class NotFoundHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(this.getErrorMessage(error), 'Error');
  }
}

@Injectable({ providedIn: 'root' })
export class ValidationErrorHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(
      this.getErrorMessage(error),
      'Validation Error'
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ServerErrorHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(
      'An unexpected server error occurred. Please try again later.',
      'Server Error'
    );
  }
}

@Injectable({ providedIn: 'root' })
export class DefaultErrorHandler extends BaseErrorHandler {
  constructor(toasterService: ToasterService) {
    super(toasterService);
  }

  handle(error: HttpErrorResponse): void {
    this.logError(error);
    this.toasterService.showError(
      'An error occurred. Please try again.',
      'Error'
    );
  }
}
