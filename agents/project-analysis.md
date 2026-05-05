# Project Analysis

## Overview
This is an ESLint configuration package (`@ix315/eslint-config`) that provides shared ESLint configurations for JavaScript/TypeScript projects, with specific support for React and Next.js.

## Project Structure

```
eslint-config/
├── index.mjs              # Main entry point - exports configs
├── eslint.config.mjs      # Local ESLint config (uses recommended)
├── src/
│   ├── recommended.mjs    # Core recommended config (ESLint + TS + React + Stylistic)
│   └── next.mjs           # Next.js specific config
├── types.d.ts             # TypeScript type definitions
├── package.json           # Package manifest
└── README.md              # Documentation
```

## Configuration Exports

### 1. `recommended` (src/recommended.mjs)
The core configuration that combines:
- **ESLint Recommended** (`@eslint/js` configs.recommended)
- **TypeScript Recommended** (`typescript-eslint` configs.recommended)
- **React Recommended** (`@eslint-react/eslint-plugin` configs["recommended-typescript"])
- **React Hooks** (`eslint-plugin-react-hooks` configs['recommended-latest'])
- **Custom Rules**:
  - Disables `@typescript-eslint/no-explicit-any`
- **Stylistic Rules** (`@stylistic/eslint-plugin`):
  - 2-space indentation
  - No semicolons
  - Single quotes
  - Max line length: 120
  - No trailing spaces
  - No tabs
  - Always object curly spacing
  - Never comma dangle
  - And more...

### 2. `next` (src/next.mjs)
Next.js specific configuration:
- Uses `@next/eslint-plugin-next` with recommended and core-web-vitals rules
- Ignores `.next/*` directory

## Dependencies

### Production Dependencies
- `@eslint-react/eslint-plugin`: React ESLint rules
- `@eslint/js`: ESLint core recommended configs
- `@next/eslint-plugin-next`: Next.js ESLint plugin
- `@stylistic/eslint-plugin`: Stylistic rules
- `eslint-import-resolver-typescript`: Import resolution for TypeScript
- `eslint-plugin-react-hooks`: React hooks linting
- `typescript`: TypeScript compiler
- `typescript-eslint`: TypeScript ESLint integration

### Peer Dependencies
- `eslint`: ^10.3.0

## Key Observations

1. **ESM Module**: Uses `"type": "module"` and `.mjs` extensions
2. **Flat Config**: Uses ESLint's new flat config format (`eslint/config` defineConfig)
3. **No Tests**: Currently no test infrastructure (scripts.test just errors)
4. **Two Config Variants**: `recommended` for general use, `next` for Next.js projects
5. **Local Usage**: The `eslint.config.mjs` shows how to consume the config locally
