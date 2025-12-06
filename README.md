# Dangdang

A modern Next.js 15 application built with Feature-Sliced Design (FSD) methodology.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `cn` utility
- **State Management**: Zustand
- **Server State**: TanStack Query v5 (Query Factory pattern)
- **HTTP Client**: Axios

## 📁 Architecture

This project strictly follows the **Feature-Sliced Design (FSD)** methodology:

```
app/           # Global routing and providers (Next.js App Router)
page-slices/   # Page-specific logic composition (named to avoid Next.js conflict)
widgets/       # Composition of features/entities
features/      # User interactions
entities/      # Business domain logic
shared/        # Reusable primitives
```

> **Note**: The FSD "pages" layer is named `page-slices/` to avoid conflicts with Next.js's reserved `pages/` directory.

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🏃 Getting Started

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

## 📚 Documentation

- [Architecture Guide](./ARCHITECTURE.md) - Detailed FSD architecture documentation
- [Feature-Sliced Design](https://feature-sliced.design/) - Official FSD documentation

## 🎯 Key Features

- ✅ Strict FSD methodology
- ✅ Type-safe with TypeScript
- ✅ Server state with TanStack Query v5
- ✅ Client state with Zustand
- ✅ Query Factory pattern
- ✅ Axios HTTP client with interceptors
- ✅ Tailwind CSS styling
- ✅ Next.js 15 App Router

## 📝 License

MIT