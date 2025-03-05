import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { BlogFacadeService } from '../../services/blog-facade.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(
    public blogFacade: BlogFacadeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['search']) {
        this.searchControl.setValue(params['search'], { emitEvent: false });
      }
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm !== null) {
          this.blogFacade.searchPosts(searchTerm);
        }
      });
  }

  onPageChange(page: number): void {
    this.blogFacade.changePage(page);
  }

  retryLoading(): void {
    this.blogFacade.retryLoading();
  }
}
