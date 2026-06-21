# @ix315/eslint-config

Shared ESLint configuration for React, TypeScript, and Next.js projects using ESLint flat config.

## Installation

```bash
npm install -D @ix315/eslint-config eslint
# or
pnpm add -D @ix315/eslint-config eslint
```

## Usage

Create an `eslint.config.mjs` in your project root:

```js
import { defineConfig } from 'eslint/config'
import eslintConfig from '@ix315/eslint-config'

export default defineConfig([
  eslintConfig.recommended,
  eslintConfig.next,
])
```

## Configs

### `recommended`

Base config for TypeScript + React projects:

- ESLint recommended rules
- TypeScript ESLint recommended rules
- React recommended (with TypeScript support)
- React Hooks rules
- Stylistic rules (@stylistic/eslint-plugin):
  - No semicolons
  - Single quotes
  - 2-space indent
  - 120 character max line length
  - No trailing spaces/tabs
  - No comma-dangle
  - Specific JSX/object spacing rules

### `next`

Next.js specific config:

- `@next/eslint-plugin-next` with `recommended` + `core-web-vitals` rules
- Ignores `.next/*`

## TypeScript Support

This config sets `@typescript-eslint/no-explicit-any` to `off` by default.

## License

ISC
