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
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (using `@tailwindcss/vite`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📁 Project Structure

- `src/routes/`: File-based routing directory.
  - `__root.tsx`: The root layout component, including HTML shell, head metadata, and global navigation.
  - `index.tsx`: The home page route.
  - `about.tsx`: The about page route.
- `src/components/`: Reusable React components (Header, Footer, ThemeToggle, etc.).
- `src/styles.css`: Global styles and Tailwind configuration. Defines the custom design system tokens.
- `public/`: Static assets (favicons, manifests).

## 🎨 Design System & Conventions

### Visual Style
The project uses a "Nature/Ocean" inspired color palette with a refined, tactile aesthetic:
- **Typography:** Fraunces (Serif for titles) and Manrope (Sans-serif for body).
- **Themes:** Supports Light, Dark, and Auto (System) modes, managed via `src/components/ThemeToggle.tsx` and a script in `__root.tsx`.
- **Glassmorphism:** Uses `island-shell` and `feature-card` classes in `styles.css` for a "lifted" look with backdrop filters and multi-layered shadows.

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
