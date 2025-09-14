

```mjs
// eslint.config.mjs
import { defineConfig } from 'eslint/config'
import eslintConfig from '@ix315/eslint-config'

export default defineConfig([
  eslintConfig.recommended,
  eslintConfig.next,
])
```