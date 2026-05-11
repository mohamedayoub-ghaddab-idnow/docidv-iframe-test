# Agentic Development Guidelines - Docidv iframe Test

This document provides guidelines for AI agents working on this codebase to maintain clean, consistent, and maintainable code.

## Project Overview

An iframe testing application for the Docidv service. Pure HTML/CSS/JS with no build process.

## Code Standards

### General Principles

- Keep it simple: no frameworks, no build tools, no transpilation
- Single responsibility: each function does one thing well
- Readability over cleverness: prefer explicit code over terse abstractions
- No premature optimization: solve the problem at hand, not hypothetical future ones

### JavaScript (app.js)

- Use `const` by default, `let` only when reassignment is needed
- Prefer `addEventListener` over inline event handlers
- Use descriptive names: `applyUrl()` not `fn1()`
- Group related functions with comment headers (e.g., `// ── URL Settings ──`)
- Avoid nested ternaries; use early returns
- Cache DOM queries at the top of the file
- No comments explaining *what* the code does — names should be self-explanatory
- Add comments only for *why* something is done (non-obvious constraints, workarounds)

### HTML (index.html)

- Semantic markup: use appropriate elements (`<button>`, `<label>`, `<section>`)
- Accessibility: always include `for` on labels, `aria-*` where needed
- Indent consistently (2 spaces)
- Group related elements with comment headers

### CSS (styles.css)

- Mobile-first media queries
- Use CSS custom properties for theming (e.g., `--sidebar-bg`, `--main-bg`)
- BEM-like naming: `.section`, `.section-header`, `.section-body`
- Avoid `!important` — fix specificity issues properly
- Group styles by component/section

## File Organization

```
docidv-iframe-test/
├── index.html        # HTML structure only
├── styles.css        # All styles
├── app.js            # All JavaScript
├── CLAUDE.md         # This file — agent guidelines
├── contexts/         # Context files for domain knowledge
│   └── iframe-security.md
├── README.md         # User-facing documentation
└── .memory-bank.md   # Project memory/notes
```

## When Making Changes

1. **Read first**: Always read the relevant files before editing
2. **Minimal diffs**: Change only what's needed for the task
3. **Test locally**: Open `index.html` in browser to verify
4. **No abstractions for abstractions' sake**: Three similar lines is fine; don't DRY prematurely

## Common Tasks

### Adding a new sidebar control

1. Add HTML section in `index.html` following existing pattern
2. Add styles in `styles.css` if needed (likely already covered)
3. Add JS logic in `app.js` in the appropriate section
4. Initialize defaults at the bottom of `app.js`

### Adding a new feature permission

1. Add checkbox to `#allowAttrList` in `index.html`
2. The existing `applyAllowAttr()` function will pick it up automatically

### Adding a new sandbox attribute

1. Add checkbox to `#sandboxAttrList` in `index.html`
2. The existing `buildSandboxValue()` function will pick it up automatically

## Deployment

```bash
git push pages main
```

GitHub Pages auto-deploys from the `main` branch.

## What NOT to Do

- Don't add a build system (no webpack, vite, etc.)
- Don't add a framework (no React, Vue, etc.)
- Don't add npm packages
- Don't add TypeScript
- Don't minify or bundle
- Don't add unnecessary abstractions or helper functions
- Don't write documentation comments inside code files

## Context Files

See `contexts/` directory for domain-specific knowledge:
- `iframe-security.md` — iframe `sandbox` and `allow` attribute reference
