/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BooksIndexImport } from './routes/books/index'
import { Route as BooksBookidImport } from './routes/books/$bookid'

// Create Virtual Routes

const SearchLazyImport = createFileRoute('/search')()
const FavoritesLazyImport = createFileRoute('/favorites')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SearchLazyRoute = SearchLazyImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/search.lazy').then((d) => d.Route))

const FavoritesLazyRoute = FavoritesLazyImport.update({
  path: '/favorites',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/favorites.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const BooksIndexRoute = BooksIndexImport.update({
  path: '/books/',
  getParentRoute: () => rootRoute,
} as any)

const BooksBookidRoute = BooksBookidImport.update({
  path: '/books/$bookid',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/favorites': {
      id: '/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof FavoritesLazyImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchLazyImport
      parentRoute: typeof rootRoute
    }
    '/books/$bookid': {
      id: '/books/$bookid'
      path: '/books/$bookid'
      fullPath: '/books/$bookid'
      preLoaderRoute: typeof BooksBookidImport
      parentRoute: typeof rootRoute
    }
    '/books/': {
      id: '/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof BooksIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/favorites': typeof FavoritesLazyRoute
  '/search': typeof SearchLazyRoute
  '/books/$bookid': typeof BooksBookidRoute
  '/books': typeof BooksIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/favorites': typeof FavoritesLazyRoute
  '/search': typeof SearchLazyRoute
  '/books/$bookid': typeof BooksBookidRoute
  '/books': typeof BooksIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/favorites': typeof FavoritesLazyRoute
  '/search': typeof SearchLazyRoute
  '/books/$bookid': typeof BooksBookidRoute
  '/books/': typeof BooksIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/favorites'
    | '/search'
    | '/books/$bookid'
    | '/books'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/favorites' | '/search' | '/books/$bookid' | '/books'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/favorites'
    | '/search'
    | '/books/$bookid'
    | '/books/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  FavoritesLazyRoute: typeof FavoritesLazyRoute
  SearchLazyRoute: typeof SearchLazyRoute
  BooksBookidRoute: typeof BooksBookidRoute
  BooksIndexRoute: typeof BooksIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  FavoritesLazyRoute: FavoritesLazyRoute,
  SearchLazyRoute: SearchLazyRoute,
  BooksBookidRoute: BooksBookidRoute,
  BooksIndexRoute: BooksIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/favorites",
        "/search",
        "/books/$bookid",
        "/books/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/favorites": {
      "filePath": "favorites.lazy.tsx"
    },
    "/search": {
      "filePath": "search.lazy.tsx"
    },
    "/books/$bookid": {
      "filePath": "books/$bookid.tsx"
    },
    "/books/": {
      "filePath": "books/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
