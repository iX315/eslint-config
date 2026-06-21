import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { ESLint } from 'eslint'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'
import * as os from 'node:os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('recommended config', () => {
  let recommended

  // Load the config once for all tests
  test('should import without errors', async () => {
    const module = await import('../configs/recommended.mjs')
    recommended = module.default
    assert.ok(Array.isArray(recommended))
    assert.ok(recommended.length > 0)
  })

  describe('config loading', () => {
    test('should have multiple config objects', () => {
      assert.ok(recommended.length >= 5)
    })

    test('should have named configs', () => {
      const names = recommended.map(c => c.name).filter(Boolean)
      assert.ok(names.includes('react'))
      assert.ok(names.includes('typing'))
      assert.ok(names.includes('style'))
    })
  })

  describe('rule configuration', () => {
    test('should disable @typescript-eslint/no-explicit-any', () => {
      const typingConfig = recommended.find(c => c.name === 'typing')
      assert.ok(typingConfig)
      assert.strictEqual(typingConfig.rules['@typescript-eslint/no-explicit-any'][0], 'off')
    })

    test('should configure @stylistic/semi as error with never', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      assert.strictEqual(styleConfig.rules['@stylistic/semi'][0], 'error')
      assert.strictEqual(styleConfig.rules['@stylistic/semi'][1], 'never')
    })

    test('should configure @stylistic/indent as 2 spaces', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      assert.strictEqual(styleConfig.rules['@stylistic/indent'][0], 'error')
      assert.strictEqual(styleConfig.rules['@stylistic/indent'][1], 2)
    })

    test('should configure @stylistic/quotes as single', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      assert.strictEqual(styleConfig.rules['@stylistic/quotes'][0], 'error')
      assert.strictEqual(styleConfig.rules['@stylistic/quotes'][1], 'single')
    })

    test('should configure @stylistic/comma-dangle as never', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      assert.strictEqual(styleConfig.rules['@stylistic/comma-dangle'][0], 'error')
      assert.strictEqual(styleConfig.rules['@stylistic/comma-dangle'][1], 'never')
    })

    test('should configure @stylistic/max-len with 120 chars', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      const maxLenRule = styleConfig.rules['@stylistic/max-len']
      assert.strictEqual(maxLenRule[0], 'error')
      assert.strictEqual(maxLenRule[1].code, 120)
      assert.strictEqual(maxLenRule[1].tabWidth, 2)
    })

    test('should configure @stylistic/no-tabs', () => {
      const styleConfig = recommended.find(c => c.name === 'style')
      assert.ok(styleConfig)
      assert.strictEqual(styleConfig.rules['@stylistic/no-tabs'], 'error')
    })
  })
})

describe('linting behavior - JavaScript', () => {
  let tempDir

  test('setup temp directory with config', () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eslint-test-'))

    const configContent = `import recommended from '${path.resolve(__dirname, '../configs/recommended.mjs').replace(/\\/g, '/')}'
export default recommended
`
    fs.writeFileSync(path.join(tempDir, 'eslint.config.mjs'), configContent)

    assert.ok(fs.existsSync(path.join(tempDir, 'eslint.config.mjs')))
  })

  test('should pass valid JS code', async () => {
    const validCode = fs.readFileSync(
      path.join(__dirname, 'fixtures', 'valid-js.js'),
      'utf-8'
    )

    const testFile = path.join(tempDir, 'test.js')
    fs.writeFileSync(testFile, validCode)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const messages = results[0].messages.filter(m =>
      m.ruleId && m.ruleId.startsWith('@stylistic/')
    )

    assert.strictEqual(messages.length, 0)
  })

  test('should fail JS code with semicolons', async () => {
    const code = "const x = 'test';\n"
    const testFile = path.join(tempDir, 'test-semi.js')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const semiError = results[0].messages.find(m => m.ruleId === '@stylistic/semi')
    assert.ok(semiError, 'Should have error for semicolon')
  })

  test('should fail JS code with double quotes', async () => {
    const code = 'const x = "test"\n'
    const testFile = path.join(tempDir, 'test-quotes.js')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const quoteError = results[0].messages.find(m => m.ruleId === '@stylistic/quotes')
    assert.ok(quoteError, 'Should have error for double quotes')
  })

  test('should fail JS code with 4-space indent', async () => {
    const code = 'function foo() {\n    return 1\n}\n'
    const testFile = path.join(tempDir, 'test-indent.js')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const indentError = results[0].messages.find(m => m.ruleId === '@stylistic/indent')
    assert.ok(indentError, 'Should have error for 4-space indent')
  })

  test('should fail JS code with trailing spaces', async () => {
    const code = 'const x = 1   \n'
    const testFile = path.join(tempDir, 'test-trailing.js')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const trailingError = results[0].messages.find(m => m.ruleId === '@stylistic/no-trailing-spaces')
    assert.ok(trailingError, 'Should have error for trailing spaces')
  })

  test('should fail JS code exceeding 120 characters', async () => {
    // Create a line with 130 'a' characters (not a string, so it won't be ignored)
    const code = `// ${'a'.repeat(130)}\n`
    const testFile = path.join(tempDir, 'test-len.js')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const maxLenError = results[0].messages.find(m => m.ruleId === '@stylistic/max-len')
    assert.ok(maxLenError, 'Should have error for exceeding max length')
  })

  test('cleanup temp directory', () => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
    assert.ok(true)
  })
})

describe('linting behavior - TypeScript', () => {
  let tempDir

  test('setup temp directory with config', () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eslint-test-ts-'))

    const configContent = `import recommended from '${path.resolve(__dirname, '../configs/recommended.mjs').replace(/\\/g, '/')}'
export default recommended
`
    fs.writeFileSync(path.join(tempDir, 'eslint.config.mjs'), configContent)
    assert.ok(fs.existsSync(path.join(tempDir, 'eslint.config.mjs')))
  })

  test('should allow any type without error', async () => {
    const code = 'const x: any = { foo: "bar" }\n'
    const testFile = path.join(tempDir, 'test.ts')
    fs.writeFileSync(testFile, code)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const anyError = results[0].messages.find(m => m.ruleId === '@typescript-eslint/no-explicit-any')
    assert.ok(!anyError, 'Should not error on any type')
  })

  test('should pass valid TypeScript code from fixture', async () => {
    const validCode = fs.readFileSync(
      path.join(__dirname, 'fixtures', 'valid-ts.ts'),
      'utf-8'
    )

    const testFile = path.join(tempDir, 'valid-test.ts')
    fs.writeFileSync(testFile, validCode)

    const eslint = new ESLint({ cwd: tempDir })
    const results = await eslint.lintFiles([testFile])

    const stylisticErrors = results[0].messages.filter(m =>
      m.ruleId && m.ruleId.startsWith('@stylistic/')
    )

    assert.strictEqual(stylisticErrors.length, 0)
  })

  test('cleanup temp directory', () => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
    assert.ok(true)
  })
})
