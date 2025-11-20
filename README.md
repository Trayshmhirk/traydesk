# TrayDesk - Multi-Framework SaaS Ticket Management System

A modern, enterprise-grade ticket management system built with three different frontend frameworks: **Next.js**, **Vue.js**, and **Twig (PHP)**. This monorepo demonstrates consistent design language and feature parity across multiple technology stacks.

## 🚀 Project Structure

```
traydesk/
├── apps/
│   ├── next-app/          # Next.js implementation
│   ├── next-app-latest/   # Latest Next.js with new features
│   ├── vue-app/           # Vue.js implementation
│   └── twig-app/          # Twig/PHP implementation
├── packages/              # Shared packages (coming soon)
│   └── ui/               # Shared UI components
└── docs/                 # Documentation
```

## ✨ Features

### Core Functionality
- 🎫 **Full CRUD Operations** - Create, Read, Update, Delete tickets
- 🔐 **Authentication & Authorization** - Secure login with session management
- 📊 **Dashboard Analytics** - Real-time ticket statistics
- 🎨 **Premium UI/UX** - Modern design with glassmorphism and animations
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿ **Accessibility** - WCAG compliant with semantic HTML

### Design System
- **Max Width**: 1440px centered layout
- **Wavy Backgrounds**: SVG-based hero sections
- **Decorative Elements**: Circles and card-based layouts
- **Status Colors**:
  - 🟢 Open - Green tones
  - 🟡 In Progress - Amber tones
  - ⚪ Closed - Gray tones

## 🛠️ Tech Stack

### Next.js App
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context/Hooks
- **Package Manager**: pnpm

### Vue.js App
- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Package Manager**: pnpm

### Twig App
- **Backend**: PHP 8+
- **Template Engine**: Twig
- **Styling**: Tailwind CSS
- **Package Manager**: Composer + npm

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm 8+
- PHP 8+ (for Twig app)
- Composer (for Twig app)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Trayshmhirk/traydesk.git
cd traydesk
```

2. **Install dependencies**
```bash
# Install root dependencies
pnpm install

# Or install for specific app
pnpm --filter next-app install
pnpm --filter vue-app install
```

3. **Run development servers**

```bash
# Next.js
pnpm dev:next

# Vue.js
pnpm dev:vue

# Twig (requires PHP)
pnpm dev:twig
```

## 🎯 Development Workflow

### Daily Commit Plan (5-15 commits/day)

This project follows a structured development approach:

- **Day 1**: Monorepo setup & foundation
- **Day 2**: Visual language & landing pages
- **Day 3**: Authentication & security
- **Day 4**: Dashboard architecture
- **Day 5**: Ticket CRUD operations
- **Day 6**: SaaS polish & optimization

### Git Workflow
```bash
# Feature development
git checkout -b feature/ticket-filters
git commit -m "feat(next): add ticket status filters"
git push origin feature/ticket-filters

# Bug fixes
git commit -m "fix(vue): resolve auth redirect loop"

# Documentation
git commit -m "docs: update API documentation"
```

## 📝 Scripts

```bash
# Development
pnpm dev:next          # Run Next.js app
pnpm dev:vue           # Run Vue.js app
pnpm dev:twig          # Run Twig app

# Build
pnpm build:next        # Build Next.js app
pnpm build:vue         # Build Vue.js app
pnpm build:twig        # Build Twig app

# Linting & Formatting
pnpm lint              # Lint all apps
pnpm format            # Format all files

# Cleanup
pnpm clean             # Remove all node_modules
```

## 🔒 Authentication

All implementations use localStorage-based session management:

**Session Key**: `ticketapp_session`

**Test Credentials**:
```
Email: admin@traydesk.com
Password: admin123
```

## 🎨 Design Guidelines

### Layout Rules
- Max width: 1440px (centered)
- Mobile-first responsive design
- Consistent spacing and typography
- Accessible color contrast ratios

### Component Structure
- Reusable UI components
- Consistent naming conventions
- Prop validation and TypeScript types
- Comprehensive error handling

## 🧪 Testing

```bash
# Unit tests (coming soon)
pnpm test

# E2E tests (coming soon)
pnpm test:e2e
```

## 📚 Documentation

- [Next.js Implementation](./apps/next-app/README.md)
- [Vue.js Implementation](./apps/vue-app/README.md)
- [Twig Implementation](./apps/twig-app/README.md)
- [Design System](./docs/design-system.md) (coming soon)
- [API Documentation](./docs/api.md) (coming soon)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 👨‍💻 Author

**Osunbajo Micheal** (Trayshmhirk)
- GitHub: [@Trayshmhirk](https://github.com/Trayshmhirk)

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- shadcn/ui for beautiful React components
- The open-source community

---

**Built with ❤️ as a demonstration of multi-framework expertise**
