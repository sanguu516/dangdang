# Dangdang - Feature-Sliced Design Architecture

A modern Next.js 15 application built with Feature-Sliced Design (FSD) methodology.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `cn` utility
- **State Management**: Zustand
- **Server State**: TanStack Query v5 (Query Factory pattern)
- **HTTP Client**: Axios

## Architecture

This project strictly follows the [Feature-Sliced Design (FSD)](https://feature-sliced.design/) methodology:

### Layers (from top to bottom)

```
app/           # Global routing and providers (Next.js App Router)
page-slices/   # Page-specific logic composition (named to avoid Next.js conflict)
widgets/       # Composition of features/entities
features/      # User interactions
entities/      # Business domain logic
shared/        # Reusable primitives
```

> **Note**: The FSD "pages" layer is named `page-slices/` to avoid conflicts with Next.js's reserved `pages/` directory.

### Layer Rules

1. **Unidirectional dependencies**: A layer can only import from layers below it
2. **No circular dependencies**: Layers cannot import from layers above
3. **Public API**: Each slice exports its public API through `index.ts`

### Directory Structure

```
dangdang/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Root page
│   ├── globals.css        # Global styles
│   └── providers/         # Global providers
│       ├── index.tsx      # Combined providers
│       └── query-provider.tsx
│
├── page-slices/                 # Page compositions
│   └── home/
│       ├── ui/
│       │   └── home-page.tsx
│       └── index.ts
│
├── widgets/               # Feature compositions
│   └── users-widget/
│       ├── ui/
│       │   └── users-widget.tsx
│       └── index.ts
│
├── features/              # User interactions
│   └── user-list/
│       ├── model/
│       │   ├── store.ts   # Zustand store
│       │   └── index.ts
│       ├── ui/
│       │   └── user-list.tsx
│       └── index.ts
│
├── entities/              # Business entities
│   └── user/
│       ├── api/
│       │   ├── user-api.ts
│       │   └── index.ts
│       ├── model/
│       │   ├── types.ts
│       │   ├── queries.ts  # TanStack Query factories
│       │   └── index.ts
│       ├── ui/
│       │   └── user-card.tsx
│       └── index.ts
│
└── shared/                # Shared utilities
    ├── api/
    │   ├── axios.ts       # Axios instance
    │   └── index.ts
    ├── config/
    │   ├── query-client.ts
    │   └── index.ts
    ├── lib/
    │   ├── cn.ts          # Tailwind merge utility
    │   ├── query-factory.ts
    │   └── index.ts
    ├── ui/                # Shared UI components
    └── types/             # Shared types
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Key Concepts

### 1. Feature-Sliced Design (FSD)

FSD is an architectural methodology for frontend projects that provides:
- Clear separation of concerns
- Predictable file structure
- Scalable architecture
- Easy onboarding for new developers

### 2. Query Factory Pattern

We use the Query Factory pattern with TanStack Query for better organization:

```typescript
// entities/user/model/queries.ts
export const userQueries = createQueryFactory(["users"]);

export const getUserQuery = (id: string) =>
  userQueries.options([id], () => fetchUser(id));
```

Usage in components:

```typescript
const { data: user } = useQuery(getUserQuery(userId));
```

### 3. Zustand for Client State

Local feature state is managed with Zustand:

```typescript
// features/user-list/model/store.ts
export const useUserListStore = create<UserListState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
```

### 4. Axios for HTTP

Centralized Axios instance with interceptors:

```typescript
// shared/api/axios.ts
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  // ... configuration
});
```

### 5. cn Utility

Tailwind class merging utility:

```typescript
import { cn } from "@/shared/lib";

<div className={cn("base-class", conditionalClass, className)} />
```

## Path Aliases

```typescript
@/app/*      -> app/*
@/page-slices/*    -> page-slices/*
@/widgets/*  -> widgets/*
@/features/* -> features/*
@/entities/* -> entities/*
@/shared/*   -> shared/*
```

## Best Practices

1. **Always use public APIs**: Import from slice's `index.ts`, not internal files
2. **Follow layer hierarchy**: Never import from upper layers
3. **Keep slices isolated**: Each slice should be self-contained
4. **Use TypeScript strictly**: Enable strict mode for type safety
5. **Server/Client components**: Use "use client" directive when needed
6. **Query Factory pattern**: Use for all server state management
7. **Zustand for local state**: Use for feature-specific client state

## Examples

### Creating a New Entity

```typescript
// entities/product/model/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

// entities/product/api/product-api.ts
export async function fetchProducts(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/products");
  return response.data;
}

// entities/product/model/queries.ts
export const productQueries = createQueryFactory(["products"]);
export const getProductsQuery = () =>
  productQueries.options(["list"], () => fetchProducts());

// entities/product/index.ts
export type { Product } from "./model";
export { getProductsQuery } from "./model";
```

### Creating a New Feature

```typescript
// features/product-filter/model/store.ts
export const useProductFilterStore = create<FilterState>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));

// features/product-filter/ui/product-filter.tsx
export function ProductFilter() {
  const { category, setCategory } = useProductFilterStore();
  // ... implementation
}
```

## Contributing

Follow the FSD methodology strictly when adding new features or entities.

## License

MIT
