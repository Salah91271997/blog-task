# Blog Application

A modern blog application built with Angular that integrates with the DEV.to API to display and manage blog posts.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Building for Production](#building-for-production)
- [API Reference](#api-reference)
- [Extending the Application](#extending-the-application)
  - [Adding New Features](#adding-new-features)
  - [Styling Customization](#styling-customization)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Debug Steps](#debug-steps)
- [Performance Considerations](#performance-considerations)

## Overview

This application provides a clean, modern interface for browsing and reading blog posts from DEV.to. It demonstrates best practices for Angular development including modular architecture, responsive design, and efficient API integration.

## Features

- Browse latest articles from DEV.to
- Search articles by tags
- Responsive layout for all devices
- Lazy loading of modules for improved performance
- Pagination for efficient data loading

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+) or yarn
- Angular CLI (v12+)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dev-to-blog.git
cd dev-to-blog
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to:

```
http://localhost:4200/
```

## Building for Production

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## API Reference

This application uses the DEV.to API:

**GET /api/articles**: Fetch blog posts

Parameters:

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 9)
- `tag`: Filter by tag (used for search)

## Extending the Application

### Adding New Features

- **New Components**: Add to the blog module or create a new feature module
- **New Services**: Add to the blog module or core module depending on scope
- **Routing**: Update blog-routing.module.ts for new blog pages

### Styling Customization

- Update colors in `styles/abstract/_colors.scss`
- Modify typography settings in `styles/base/_typography.scss`
- Adjust spacing variables in `styles/abstract/_variables.scss`

## Troubleshooting

### Common Issues

- **API Rate Limiting**: DEV.to API has rate limits. If you see errors, you might be hitting these limits.
- **CORS Issues**: If experiencing CORS errors, consider using a proxy in development.
- **Module Not Found Errors**: Check import paths and ensure modules are properly exported.

### Debug Steps

1. Check browser console for errors
2. Verify network requests in dev tools
3. Check for any console logs from error interceptors

## Performance Considerations

- **Lazy Loading**: Feature modules are lazy-loaded for faster initial load
- **Pagination**: Limits the number of items loaded at once
- **Responsive Images**: Proper handling of image sizes for different devices
- **Debounced Search**: Prevents excessive API calls during searching
