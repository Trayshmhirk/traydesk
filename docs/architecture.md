# TrayDesk Architecture

This document describes the architecture and design decisions of the TrayDesk monorepo.

## Monorepo Structure

TrayDesk uses **pnpm workspaces** to manage multiple applications in a single repository.

### Why Monorepo?

- **Code Sharing**: Share configurations, utilities, and types across apps
- **Consistent Tooling**: Same linting, formatting, and testing setup
- **Atomic Changes**: Update all apps together when making breaking changes
- **Simplified Dependencies**: Single lockfile for all apps

## Application Architecture

### Next.js App (`apps/next-app`)

**Framework**: Next.js 14+ with App Router

#### Next.js Directory Structure

```c
apps/next-app/
├── app/
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── auth/             # Auth components
│   ├── common/           # Shared components
│   ├── dashboard/        # Dashboard components
│   ├── tickets/          # Ticket components
│   └── ui/               # shadcn/ui components
└── lib/
    ├── hooks/            # Custom React hooks
    ├── store/            # Zustand stores
    └── utils.ts          # Utility functions
```

#### Next.js Key Technologies

- **State Management**: Zustand (lightweight, simple)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: Next.js App Router with layouts

#### Next.js Data Flow

```c
User Action → Component → Store (Zustand) → localStorage → UI Update
```

### Vue.js App (`apps/vue-app`)

**Framework**: Vue 3 with Composition API

#### Vue.js Directory Structure

```c
apps/vue-app/
├── src/
│   ├── assets/           # Static assets
│   ├──components/        # Vue components
│   ├── router/           # Vue Router config
│   ├── stores/           # Pinia stores
│   ├── views/            # Page components
│   ├── App.vue
│   └── main.ts
└── index.html
```

#### Vue.js Key Technologies

- **State Management**: Pinia (official Vue store)
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

#### Vue.js Data Flow

```c
User Action → Component → Store (Pinia) → localStorage → Reactive Update
```

### Twig App (`apps/twig-app`)

**Backend**: PHP 8+ with Twig templating

#### Twig Directory Structure

```c
apps/twig-app/
├── src/
│   ├── templates/        # Twig templates
│   ├── styles/           # CSS files
│   └── index.php         # Entry point
├── cache/                # Twig cache (gitignored)
├── vendor/               # Composer dependencies
└── composer.json
```

#### Twig Key Technologies

- **Template Engine**: Twig
- **Styling**: Tailwind CSS
- **Session**: PHP Sessions
- **Routing**: Simple PHP routing

## Authentication Architecture

All three apps use a **consistent authentication approach**:

### Storage

- **Key**: `ticketapp_session`
- **Location**: localStorage (browser)
- **Format**: JSON object with user data

### Flow

```c
1. User submits login form
2. Validate credentials (mock)
3. Store session in localStorage
4. Redirect to dashboard
5. Protected routes check session
6. Logout clears session
```

### Mock Authentication

For demonstration purposes, authentication is mocked:

```typescript
// Valid credentials
{
  email: "admin@traydesk.com",
  password: "admin123"
}
```

> **Production Note**: In a real app, replace with proper backend authentication (JWT, OAuth, etc.)

## Data Management

### Tickets Data Structure

```typescript
interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority?: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}
```

### Storage Strategy

**Development/Demo**: localStorage

- Easy to implement
- No backend required
- Data persists across sessions
- Limited to ~5MB

**Production**: Would use:

- REST API + Database
- GraphQL
- Real-time subscriptions (WebSockets)

## Styling Architecture

### Design System

All apps share the same design language:

- **Max Width**: 1440px
- **Colors**: Consistent palette across frameworks
- **Typography**: Tailwind's default scale
- **Spacing**: Tailwind's spacing scale

### Tailwind CSS

- **Configuration**: Each app has its own `tailwind.config.js`
- **Plugins**: `@tailwindcss/postcss` for v4
- **Purging**: Automatic in production builds

### Component Design

- Mobile-first responsive design
- Reusable, composable components
- Consistent prop interfaces
- Accessibility built-in (ARIA, semantic HTML)

## Build & Deployment

### Next.js

```bash
pnpm build:next  # → .next/ folder
pnpm start       # Production server
```

Deploy to: Vercel, Netlify, Docker

### Vue.js

```bash
pnpm build:vue   # → dist/ folder
```

Deploy to: Vercel, Netlify, Static hosting

### Twig

```bash
# PHP server required
php -S localhost:8000 -t src
```

Deploy to: Traditional PHP hosting, Apache, Nginx

## Monorepo Tooling

### pnpm Workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Turbo (Optional)

`turbo.json` configures caching and parallel builds for improved performance.

### Husky + lint-staged

- **Pre-commit**: Run linters and formatters
- **Commit-msg**: Validate commit messages

## Future Enhancements

### Planned Features

1. **Shared UI Package**: `packages/ui` with framework-agnostic components
2. **API Package**: `packages/api` with shared types and utilities
3. **E2E Testing**: Playwright tests across all apps
4. **CI/CD**: GitHub Actions for automated testing and deployment
5. **Backend Integration**: RESTful or GraphQL API
6. **Real Auth**: JWT or OAuth implementation

### Scalability Considerations

- Microservices architecture for backend
- CDN for static assets
- Database optimization (indexing, caching)
- Load balancing for high traffic
- Monitoring and observability (Sentry, DataDog)

## Design Decisions

### Why Three Frameworks?

This project demonstrates:

- **Framework Expertise**: Proficiency across different stacks
- **Consistent UX**: Same features, different implementations
- **Best Practices**: Each framework's recommended patterns
- **Comparison**: Performance, DX, and complexity trade-offs

### Monorepo Rationale

- Easier to maintain consistency
- Share configurations
- Atomic commits across apps
- Single CI/CD pipeline

### Why localStorage for Auth?

- **Simplicity**: No backend required for demo
- **Educational**: Focus on frontend patterns
- **Production**: Would be replaced with proper auth

---

For more information, see:

- [Getting Started](./getting-started.md)
- [Contributing Guide](./contributing.md)
- [Design System](./design-system.md)
