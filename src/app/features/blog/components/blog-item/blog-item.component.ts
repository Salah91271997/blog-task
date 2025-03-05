import { Component, Input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
})
export class BlogItemComponent {
  @Input() post!: BlogPost;

  navigateToBlogPost(): void {
    window.open(this.post.url, '_blank');
  }
}
