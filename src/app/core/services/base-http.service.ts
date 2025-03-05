import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(private http: HttpClient) {}

  // Generic JSON Methods
  get<T>(
    endpoint: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
      cache?: boolean;
      cacheSize?: number;
    } = {}
  ): Observable<T> {
    const obs$ = this.http
      .get<T>(endpoint, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));

    return options.cache
      ? obs$.pipe(shareReplay(options.cacheSize || 1))
      : obs$;
  }

  post<T>(
    endpoint: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .post<T>(endpoint, body, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(
    endpoint: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .put<T>(endpoint, body, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(
    endpoint: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .delete<T>(endpoint, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));
  }

  deleteWithBody<T>(
    endpoint: string,
    body: any,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .request<T>('delete', endpoint, {
        headers: options.headers,
        params: options.params,
        body,
      })
      .pipe(catchError(this.handleError));
  }

  // FormData Methods
  postFormData<T>(
    endpoint: string,
    formData: FormData,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .post<T>(endpoint, formData, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));
  }

  putFormData<T>(
    endpoint: string,
    formData: FormData,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    return this.http
      .put<T>(endpoint, formData, {
        headers: options.headers,
        params: options.params,
      })
      .pipe(catchError(this.handleError));
  }

  // File Operations
  downloadFile(
    endpoint: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<Blob> {
    return this.http
      .get(endpoint, {
        headers: options.headers,
        params: options.params,
        responseType: 'blob',
      })
      .pipe(catchError(this.handleError));
  }

  uploadFile<T>(
    endpoint: string,
    file: File,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {}
  ): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);
    return this.postFormData<T>(endpoint, formData, options);
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
}
