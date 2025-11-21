# Contributing to TrayDesk

Thank you for your interest in contributing to TrayDesk! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Search existing [Issues](https://github.com/Trayshmhirk/traydesk/issues) to avoid duplicates
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### Suggesting Features

1. Check existing issues and discussions
2. Create an issue labeled `enhancement`
3. Describe the use case and benefits
4. Provide examples or mockups if possible

### Submitting Code

#### 1. Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/traydesk.git
cd traydesk
git remote add upstream https://github.com/Trayshmhirk/traydesk.git
```

#### 2. Create a Branch

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-bugfix
```

#### 3. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

#### 4. Test Your Changes

```bash
# Run the affected app
pnpm dev:next   # or dev:vue, dev:twig

# Run linters
pnpm lint

# Format code
pnpm format
```

#### 5. Commit Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(next-app): add ticket filtering"
git commit -m "fix(vue-app): resolve auth redirect loop"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor(twig-app): simplify routing logic"
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Scopes:**

- `next-app`
- `vue-app`
- `twig-app`
- `docs`
- `ci`

#### 6. Push & Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub with:

- Clear title describing the change
- Description of what changed and why
- Link to related issues
- Screenshots/videos for UI changes

## Development Guidelines

### Code Style

- **TypeScript/JavaScript**: Follow ESLint rules
- **Vue**: Use Composition API with `<script setup>`
- **React**: Use functional components with hooks
- **PHP**: Follow PSR-12 standard

### Component Guidelines

#### React/Next.js

```tsx
// Good: Functional component with types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn("btn", `btn-${variant}`)}>
      {label}
    </button>
  );
}
```

#### Vue.js

```vue
<!-- Good: Composition API with TypeScript -->
<script setup lang="ts">
interface Props {
  label: string;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button :class="['btn', `btn-${variant}`]" @click="emit('click')">
    {{ label }}
  </button>
</template>
```

### Testing (Coming Soon)

- Write unit tests for utilities and stores
- Write integration tests for important flows
- Write E2E tests for critical paths
- Aim for >80% code coverage

### Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)

## Project-Specific Guidelines

### Adding a New Feature

1. **Design First**: Create mockups or wireframes
2. **Update Docs**: Document the feature
3. **Implement**: Build it in the framework(s)
4. **Test**: Manual and automated testing
5. **Review**: Self-review before creating PR

### Updating Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update specific package
pnpm update package-name

# Update all (carefully!)
pnpm update
```

Always test thoroughly after dependency updates.

### Performance Considerations

- Keep bundle sizes small
- Lazy load components when possible
- Optimize images (use Next.js Image, etc.)
- Avoid unnecessary re-renders
- Profile before optimizing

## Git Workflow

### Branch Naming

- `feature/ticket-filters`
- `fix/auth-redirect`
- `docs/api-documentation`
- `refactor/ticket-store`

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Resolving Conflicts

```bash
git fetch upstream
git rebase upstream/main
# Resolve conflicts
git add .
git rebase --continue
```

## Review Process

### What We Look For

✅ **Code Quality**

- Clean, readable code
- Proper error handling
- No console.logs in production code

✅ **Functionality**

- Feature works as described
- No breaking changes (or documented)
- Edge cases handled

✅ **Testing**

- Code is testable
- Tests pass (when we add them)

✅ **Documentation**

- README updated if needed
- Code comments for complex logic
- API docs updated

### Getting Your PR Merged

- Respond to feedback promptly
- Make requested changes
- Keep the PR focused (one feature/fix per PR)
- Ensure CI passes (when we set it up)

## Questions?

- Open a [Discussion](https://github.com/Trayshmhirk/traydesk/discussions)
- Ask in your PR
- Create an issue

## Recognition

Contributors will be added to the README! 🎉

---

Thank you for contributing to TrayDesk! 🙏
