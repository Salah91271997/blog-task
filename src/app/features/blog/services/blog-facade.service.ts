import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';
import { BlogService } from './blog.service';
import { BlogStateService } from './blog-state.service';
import { PaginationService } from './pagination.service';
@Injectable({
  providedIn: 'root',
})
@Injectable()
export class BlogFacadeService {
  constructor(
    private blogService: BlogService,
    private stateService: BlogStateService,
    private paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize from URL parameters if they exist
    this.route.queryParams.subscribe((params) => {
      const page = params['page'] ? Number(params['page']) : 1;
      const search = params['search'] || '';

      // Update pagination and state based on URL params
      if (page > 0) {
        this.paginationService.updatePagination({ currentPage: page });
      }

      if (search) {
        this.stateService.setSearchTerm(search);
      }

      // Load blog posts based on URL params
      this.loadBlogPosts();
    });
  }

  // Existing getters
  get blogPosts$() {
    return this.stateService.blogPosts$;
  }
  get loading$() {
    return this.stateService.loading$;
  }
  get error$() {
    return this.stateService.error$;
  }
  get pagination$() {
    return this.paginationService.pagination$;
  }
  get searchTerm$() {
    return this.stateService.searchTerm$;
  }

  // Load blog posts
  loadBlogPosts(): void {
    this.stateService.setLoading(true);
    this.stateService.setError(null);

    const { currentPage, itemsPerPage } =
      this.paginationService.currentPagination;
    const searchTerm = this.stateService.searchTerm;

    this.blogService
      .getBlogPosts({
        page: currentPage,
        per_page: itemsPerPage,
        q: searchTerm, // Add search term to API request
      })
      .pipe(
        tap((posts) => {
          this.stateService.setBlogPosts(posts);

          // Estimate total pages based on items per page
          this.paginationService.updatePagination({
            totalPages: 10, // Estimated based on DEV.to content
          });
        }),
        catchError((error) => {
          this.stateService.setError(
            'Failed to load blog posts. Please try again.'
          );
          return of([]);
        }),
        finalize(() => {
          this.stateService.setLoading(false);
        })
      )
      .subscribe();
  }

  // Change page and update URL
  changePage(pageNumber: number): void {
    if (this.paginationService.goToPage(pageNumber)) {
      this.updateUrlParams({ page: pageNumber });
      this.loadBlogPosts();
    }
  }

  // Search posts
  searchPosts(searchTerm: string): void {
    this.stateService.setSearchTerm(searchTerm);
    this.paginationService.resetToFirstPage();
    this.updateUrlParams({ page: 1, search: searchTerm });
    this.loadBlogPosts();
  }

  // Helper to update URL parameters without navigating
  private updateUrlParams(params: { [key: string]: any }): void {
    const currentParams = { ...this.route.snapshot.queryParams };

    // Update with new params
    const updatedParams = { ...currentParams, ...params };

    // Remove empty params
    Object.keys(updatedParams).forEach((key) => {
      if (
        updatedParams[key] === null ||
        updatedParams[key] === undefined ||
        updatedParams[key] === ''
      ) {
        delete updatedParams[key];
      }
    });

    // Update URL without navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: updatedParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  // Get page numbers for pagination UI
  getPageNumbers(): number[] {
    return this.paginationService.getPageNumbers();
  }

  // Retry loading posts after error
  retryLoading(): void {
    this.loadBlogPosts();
  }
}
