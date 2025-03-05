import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

// Services
import { BlogService } from './services/blog.service';
import { BlogStateService } from './services/blog-state.service';
import { PaginationService } from './services/pagination.service';
import { BlogFacadeService } from './services/blog-facade.service';
import { SharedModule } from '../../shared/shared.module';
import { BlogRouterModule } from './blog.routet.module';

@NgModule({
  declarations: [BlogListComponent, BlogItemComponent],
  imports: [CommonModule, ReactiveFormsModule, BlogRouterModule, SharedModule],
  providers: [],
})
export class BlogModule {}
