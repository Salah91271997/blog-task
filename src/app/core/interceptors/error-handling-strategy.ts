import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  BadRequestHandler,
  UnauthorizedHandler,
  ForbiddenHandler,
  NotFoundHandler,
  ValidationErrorHandler,
  ServerErrorHandler,
  DefaultErrorHandler,
} from './error-handlers';
import { BaseErrorHandler } from './base-error-handlers';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingStrategy {
  private errorHandlers!: Map<number, BaseErrorHandler>;

  constructor(
    private badRequestHandler: BadRequestHandler,
    private unauthorizedHandler: UnauthorizedHandler,
    private forbiddenHandler: ForbiddenHandler,
    private notFoundHandler: NotFoundHandler,
    private validationErrorHandler: ValidationErrorHandler,
    private serverErrorHandler: ServerErrorHandler,
    private defaultErrorHandler: DefaultErrorHandler
  ) {
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    this.errorHandlers = new Map([
      [400, this.badRequestHandler],
      [401, this.unauthorizedHandler],
      [403, this.forbiddenHandler],
      [404, this.notFoundHandler],
      [422, this.validationErrorHandler],
    ]);
  }

  public handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      this.defaultErrorHandler.handle(error);
      return;
    }

    const handler = this.getHandler(error.status);
    handler.handle(error);
  }

  private getHandler(status: number): BaseErrorHandler {
    const handler = this.errorHandlers.get(status);
    if (handler) return handler;

    if (status >= 500) return this.serverErrorHandler;
    return this.defaultErrorHandler;
  }
}
