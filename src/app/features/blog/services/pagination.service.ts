import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationState } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private paginationSubject = new BehaviorSubject<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
  });

  pagination$: Observable<PaginationState> =
    this.paginationSubject.asObservable();

  constructor() {}

  get currentPagination(): PaginationState {
    return this.paginationSubject.getValue();
  }

  updatePagination(pagination: Partial<PaginationState>): void {
    this.paginationSubject.next({
      ...this.currentPagination,
      ...pagination,
    });
  }

  goToPage(page: number): boolean {
    const { currentPage, totalPages } = this.currentPagination;

    if (page !== currentPage && page > 0 && page <= totalPages) {
      this.updatePagination({ currentPage: page });
      return true;
    }
    return false;
  }

  nextPage(): boolean {
    const { currentPage, totalPages } = this.currentPagination;
    return this.goToPage(currentPage + 1);
  }

  prevPage(): boolean {
    const { currentPage } = this.currentPagination;
    return this.goToPage(currentPage - 1);
  }

  resetToFirstPage(): void {
    this.updatePagination({ currentPage: 1 });
  }

  getPageNumbers(): number[] {
    const { currentPage, totalPages } = this.currentPagination;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }
}
