import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginStylistic from '@stylistic/eslint-plugin'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    name: 'react',
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  eslintPluginReactHooks.configs['recommended-latest'],
  {
    name: 'typing',
    rules: {
      '@typescript-eslint/no-explicit-any': ['off']
    }
  },
  {
    name: 'imports',
    plugins: {
      import: eslintPluginImport
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': [
          '.ts',
          '.tsx'
        ]
      },
      'import/resolver': {
        'typescript': {
          'alwaysTryTypes': true
        }
      }
    },
    rules: {
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          'pathGroups': [
            {
              pattern: '@/**',
              group: 'internal'
            }
          ],
          'groups': [
            [
              'builtin',
              'external'
            ],
            'internal',
            [
              'parent',
              'sibling',
              'index',
              'object'
            ],
            'type'
          ],
          'pathGroupsExcludedImportTypes': [
            'internal',
            'type'
          ]
        }
      ],
      'import/newline-after-import': 'error',
      'import/consistent-type-specifier-style': [
        'error',
        'prefer-top-level'
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports'
        }
      ]
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