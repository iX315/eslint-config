# Test Plan

## Test Cases to Implement

### 1. Config Loading Tests (`recommended.test.mjs`)

#### Import Tests
- [ ] Should import recommended config without errors
- [ ] Should export a valid array
- [ ] Should have multiple config objects in the array

#### Rule Verification Tests
- [ ] Should have `@typescript-eslint/no-explicit-any` disabled
- [ ] Should have `@stylistic/semi` set to 'never'
- [ ] Should have `@stylistic/indent` set to 2 spaces
- [ ] Should have `@stylistic/quotes` set to 'single'
- [ ] Should have `@stylistic/comma-dangle` set to 'never'
- [ ] Should have `@stylistic/max-len` with code limit of 120

### 2. Linting Behavior Tests

#### JavaScript Linting
- [ ] Should pass valid JS code (no semicolons, single quotes, 2-space indent)
- [ ] Should fail JS code with semicolons (when semi: 'never')
- [ ] Should fail JS code with double quotes (when quotes: 'single')
- [ ] Should fail JS code with 4-space indent (when indent: 2)

#### TypeScript Linting
- [ ] Should pass valid TS code
- [ ] Should allow `any` type without error (no-explicit-any is off)
- [ ] Should fail TS code with TypeScript-specific violations

#### React Linting (if JSX/TSX fixtures)
- [ ] Should pass valid JSX code
- [ ] Should fail invalid JSX code
- [ ] Should enforce React hooks rules

#### Stylistic Rule Tests
- [ ] Should fail code with trailing spaces
- [ ] Should fail code exceeding 120 characters
- [ ] Should fail code with tabs
- [ ] Should pass code with proper object-curly-spacing

### 3. Next.js Config Tests (`next.test.mjs`)

#### Import Tests
- [ ] Should import next config without errors
- [ ] Should include Next.js plugin
- [ ] Should have `.next/*` in ignores

#### Next.js Rule Tests
- [ ] Should apply Next.js recommended rules
- [ ] Should apply core-web-vitals rules

### 4. Integration Tests

- [ ] Should be able to use config in eslint.config.mjs format
- [ ] Should work with TypeScript files
- [ ] Should work with React/Next.js files

## Implementation Steps

1. Create `__tests__` directory
2. Create test files for each config
3. Create fixture files with sample code
4. Implement config loading tests
5. Implement linting behavior tests
6. Update package.json test script
7. Run tests and verify

## Example Test (Node.js test runner)

```javascript
import { test, describe } from 'node:test'
import assert from 'node:assert'
import recommended from '../src/recommended.mjs'

describe('recommended config', () => {
  test('should import without errors', () => {
    assert.ok(Array.isArray(recommended))
    assert.ok(recommended.length > 0)
  })

  test('should have stylistic rules configured', () => {
    const styleConfig = recommended.find(c => c.name === 'style')
    assert.ok(styleConfig)
    assert.strictEqual(styleConfig.rules['@stylistic/semi'][0], 'error')
    assert.strictEqual(styleConfig.rules['@stylistic/semi'][1], 'never')
  })
})
```
