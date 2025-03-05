import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
@Injectable({
  providedIn: 'root',
})
@Injectable()
export class BlogStateService {
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private searchTermSubject = new BehaviorSubject<string>('');

  blogPosts$: Observable<BlogPost[]> = this.blogPostsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor() {}

  // Getters
  get blogPosts(): BlogPost[] {
    return this.blogPostsSubject.getValue();
  }

  get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  get error(): string | null {
    return this.errorSubject.getValue();
  }

  get searchTerm(): string {
    return this.searchTermSubject.getValue();
  }

  // Setters
  setBlogPosts(posts: BlogPost[]): void {
    this.blogPostsSubject.next(posts);
  }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  // Reset state
  resetState(): void {
    this.blogPostsSubject.next([]);
    this.loadingSubject.next(false);
    this.errorSubject.next(null);
    this.searchTermSubject.next('');
  }
}
