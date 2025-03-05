import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPostResponse } from '../interfaces/blog-post.interface';
import { PaginationParams } from '../interfaces/pagination.interface';
import { BlogPost } from '../models/blog-post.model';
import { EnvironmentService } from '../../../core/services/environment.service';
import { BaseHttpService } from '../../../core/services/base-http.service';

export interface BlogSearchParams extends PaginationParams {
  q?: string;
}
@Injectable({
  providedIn: 'root',
})
@Injectable()
export class BlogService {
  constructor(private http: BaseHttpService, private env: EnvironmentService) {}

  getBlogPosts(params: BlogSearchParams): Observable<BlogPost[]> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('per_page', params.per_page.toString());

    if (params.q && params.q.trim() !== '') {
      httpParams = httpParams.set('tag', params.q);
    }

    return this.http
      .get<BlogPostResponse[]>(this.env.blogApiUrl, {
        params: httpParams,
        cache: false,
      })
      .pipe(map((response) => response.map((post) => new BlogPost(post))));
  }
}
