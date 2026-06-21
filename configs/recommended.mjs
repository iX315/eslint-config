import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import eslintPluginReact from '@eslint-react/eslint-plugin'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginReact.configs["recommended-typescript"],
  {
    name: 'react',
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    name: 'react-hooks',
    plugins: {
      'react-hooks': eslintPluginReactHooks
    },
    rules: eslintPluginReactHooks.configs['recommended-latest'].rules
  },
  {
    name: 'typing',
    rules: {
      '@typescript-eslint/no-explicit-any': ['off']
    }
  },
  {
    name: 'style',
    plugins: {
      '@stylistic': eslintPluginStylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always', avoidEscape: true }],
      '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          tabWidth: 2,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreUrls: true
        }
      ]
    }
  }
])