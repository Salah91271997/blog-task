import { BlogPostResponse } from '../interfaces/blog-post.interface';

export class BlogPost {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  coverImage: string;
  readingTime: number;
  tags: string[];
  category?: string;
  author: {
    name: string;
    profileImage: string;
  };
  url: string;
  reactionCount: number;
  commentCount: number;

  constructor(post: BlogPostResponse) {
    this.id = post.id;
    this.title = post.title;
    this.description = post.description;
    this.publishDate = post.readable_publish_date;
    this.coverImage = post.cover_image || post.social_image;
    this.readingTime = post.reading_time_minutes;
    this.tags = post.tag_list;
    // Use first tag as category if available
    this.category =
      post.tag_list && post.tag_list.length > 0 ? post.tag_list[0] : undefined;
    this.author = {
      name: post.user.name,
      profileImage: post.user.profile_image_90,
    };
    this.url = post.url;
    this.reactionCount = post.positive_reactions_count;
    this.commentCount = post.comments_count;
  }
}
