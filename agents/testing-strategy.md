# Testing Strategy

## Testing Approach for ESLint Configurations

Testing ESLint configurations requires a different approach than typical unit tests. The goal is to verify that:
1. The config can be loaded without errors
2. The config produces expected results when linting code
3. Specific rules are configured correctly

## Recommended Testing Method

### Option 1: ESLint API Testing (Recommended)
Use ESLint's JavaScript API to programmatically lint code snippets and verify:
- Config loads without errors
- Specific rules are enabled/disabled as expected
- Code that violates rules is caught
- Code that follows rules passes

### Option 2: Snapshot Testing
Snapshot the resolved configuration to detect unintended changes.

## Test Structure

```
__tests__/
├── recommended.test.mjs   # Tests for recommended config
├── next.test.mjs         # Tests for next config
└── fixtures/             # Sample code files
    ├── valid.js
    ├── invalid.js
    ├── valid.tsx
    └── invalid.tsx
```

## What to Test

### Config Loading Tests
- Config can be imported without errors
- Config is a valid ESLint flat config array
- All plugins are properly resolved

### Rule Configuration Tests
- Verify specific rules are set correctly (e.g., `@stylistic/semi`: 'never')
- Verify rule severity levels
- Verify rules that should be disabled are actually disabled

### Linting Behavior Tests
- Code with violations is reported
- Code without violations passes
- TypeScript files are handled correctly
- React/JSX files are handled correctly
- Next.js specific rules work (for next config)

## Test Framework Choice

Since this is an ESM project, use one of:
- **Node.js built-in test runner** (`node:test`) - no additional dependencies
- **Vitest** - modern, ESM-native test runner
- **Jest** with ESM support - requires configuration

**Recommendation**: Use Node.js built-in test runner for simplicity, or Vitest if already familiar.
