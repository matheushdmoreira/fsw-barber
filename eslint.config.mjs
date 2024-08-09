import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends('@rocketseat/eslint-config/next', 'next/core-web-vitals'),
  {
    rules: {
      'no-unused-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-var': 0,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
