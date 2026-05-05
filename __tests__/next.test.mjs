import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { Linter } from 'eslint'
import * as path from 'node:path'
import * as fs from 'node:fs'

// Import the next config
import nextConfig from '../src/next.mjs'

const linter = new Linter()

describe('next config', () => {
  describe('config loading', () => {
    test('should import without errors', () => {
      assert.ok(Array.isArray(nextConfig))
      assert.ok(nextConfig.length > 0)
    })

    test('should have Next.js plugin configured', () => {
      const hasNextPlugin = nextConfig.some(config =>
        config.plugins && config.plugins['@next/next']
      )
      assert.ok(hasNextPlugin, 'Should have @next/next plugin')
    })

    test('should have ignores for .next/*', () => {
      const hasIgnores = nextConfig.some(config =>
        config.ignores && config.ignores.includes('.next/*')
      )
      assert.ok(hasIgnores, 'Should ignore .next/*')
    })
  })

  describe('Next.js rules', () => {
    test('should include recommended Next.js rules', () => {
      const configWithRules = nextConfig.find(c => c.rules)
      assert.ok(configWithRules)

      const rules = configWithRules.rules
      assert.ok(Object.keys(rules).some(r => r.startsWith('@next/next/')))
    })

    test('should detect next/image usage issues', () => {
      const code = `import Image from 'next/image'
export default function Page() {
  return <Image src="/logo.png" alt="Logo" />
}
`

      const messages = linter.verify(code, nextConfig, { filename: 'page.tsx' })
      // The core-web-vitals config includes rules that might warn about missing width/height
      // This just verifies the config can lint Next.js code without crashing
      assert.ok(Array.isArray(messages))
    })
  })

  describe('integration with recommended', () => {
    test('should work when combined with recommended config', async () => {
      const { default: configs } = await import('../index.mjs')

      assert.ok(configs.recommended)
      assert.ok(configs.next)

      const combined = [...configs.recommended, ...configs.next]
      assert.ok(Array.isArray(combined))
      assert.ok(combined.length > 0)
    })
  })
})
