import { defineConfig } from 'eslint/config'
import eslintPluginNext from '@next/eslint-plugin-next'

export default defineConfig([
  {
    plugins: {
      '@next/next': eslintPluginNext
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules
    }
  },
  {
    ignores: ['.next/*']
  }
])