# Project: simpleworship

A modern, full-stack React application built with the **TanStack Start** framework. This project provides a type-safe, performant, and aesthetically polished foundation for a worship-related application.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test
```

### Linting & Formatting

```bash
npm run lint    # Run ESLint
npm run format  # Check formatting with Prettier
npm run check   # Automatically fix linting and formatting issues
```

## 🛠 Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (Full-stack React)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based, 100% type-safe)
- **UI Library:** [Material UI v6](https://mui.com/)
- **Design Philosophy:** "The Editorial Archive" (Gallery-like, white space, tonal layering)
- **Typography:** Manrope (Headlines) and Inter (Body)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📁 Project Structure

- `src/routes/`: File-based routing directory.
  - `__root.tsx`: The root layout component, including MUI ThemeProvider and CssBaseline.
  - `index.tsx`: The home page (Controller Dashboard).
  - `display.tsx`: The live display for projection.
- `src/components/`: Reusable React components (Header, Footer).
- `src/theme.ts`: Custom MUI theme definition following the design system.
- `src/styles.css`: Global styles, including Tailwind CSS imports.

## 🎨 Design System & Conventions

### The Editorial Archive

- **Tonal Layering:** Depth is created using background color shifts (e.g., #f8f9fa to #f1f4f6) instead of 1px solid borders.
- **Glassmorphism:** Applied to the AppBar and floating modals with semi-transparent surfaces and backdrop-blur.
- **High Contrast:** Pure black (#000000) for all primary text and headlines on light neutral backgrounds.

### Coding Patterns

1.  **Type-Safe Routing:** Always use `createFileRoute` for route definitions and the `<Link>` component for navigation.
2.  **Server Functions:** Utilize `createServerFn` from `@tanstack/react-start` for server-side logic and data mutations.
3.  **Data Loading:** Prefer TanStack Router's `loader` for route-level data fetching to ensure data is ready before rendering.
4.  **Styling:** Use Tailwind utility classes combined with the custom CSS variables defined in `src/styles.css` (e.g., `text-[var(--sea-ink)]`).
5.  **Clean Code:** Follow the established ESLint and Prettier configurations. Use `npm run check` frequently to maintain code quality.

## 📝 Roadmap / TODOs

- [ ] Implement core worship management features.
- [ ] Add database integration (Drizzle/Prisma recommended for TanStack Start).
- [ ] Expand the component library with UI primitives.
- [ ] Set up CI/CD pipeline for automated testing and deployment.
