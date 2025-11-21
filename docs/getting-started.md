# Getting Started with TrayDesk

This guide will help you set up and run TrayDesk locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0 or higher
- **PHP** 8.0+ (for Twig app only)
- **Composer** (for Twig app only)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Trayshmhirk/traydesk.git
cd traydesk
```

### 2. Install Dependencies

```bash
# Install all dependencies for all apps
pnpm install
```

This will install dependencies for:

- Root workspace (Husky, Prettier, ESLint, etc.)
- Next.js app
- Vue.js app
- Twig app (Node dependencies only)

### 3. Set Up PHP Dependencies (Twig App Only)

If you plan to run the Twig app:

```bash
cd apps/twig-app
composer install
cd ../..
```

### 4. Run Development Servers

Choose the framework you want to work with:

#### Next.js App

```bash
pnpm dev:next
```

Open [http://localhost:3200](http://localhost:3200)

#### Vue.js App

```bash
pnpm dev:vue
```

Open [http://localhost:5173](http://localhost:5173)

#### Twig App

```bash
pnpm dev:twig
```

Open [http://localhost:8000](http://localhost:8000)

## Project Structure

```bash
traydesk/
├── apps/
│   ├── next-app/       # Next.js TypeScript application
│   ├── vue-app/        # Vue 3 TypeScript application
│   └── twig-app/       # PHP Twig application
├── packages/           # Shared packages (future)
├── docs/              # Documentation
├── .husky/            # Git hooks
└── package.json       # Root workspace config
```

## Development Workflow

### Making Changes

1. Create a new branch:

```bash
git checkout -b feature/my-feature
```

2. Make your changes in the appropriate app directory

3. Test your changes locally

4. Commit following conventional commits:

```bash
git commit -m "feat(next-app): add new feature"
```

### Code Quality

The project uses automated tools to ensure code quality:

- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Runs linters on staged files
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Commitlint**: Commit message validation

These run automatically when you commit.

## Next Steps

- Read the [Architecture Guide](./architecture.md)
- Learn about [Contributing](./contributing.md)
- Check the [API Documentation](./api.md)
- Review the [Design System](./design-system.md)

## Troubleshooting

### Port Already in Use

If you see "Port already in use" errors:

```bash
# Find and kill the process using the port
# On Windows:
netstat -ano | findstr :3200
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3200 | xargs kill
```

### Dependency Issues

Clear all dependencies and reinstall:

```bash
pnpm clean
pnpm install
```

### Need Help?

- Check existing [Issues](https://github.com/Trayshmhirk/traydesk/issues)
- Create a [New Issue](https://github.com/Trayshmhirk/traydesk/issues/new)
