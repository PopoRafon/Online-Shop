module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variable', 'property'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: ['typeLike', 'enumMember'],
        format: ['PascalCase'],
      },
      {
        selector: ['parameter', 'method'],
        format: ['camelCase', 'PascalCase'],
      }
    ],
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'type'
    ],
    '@typescript-eslint/array-type': [
      'error',
      {
        'default': 'array-simple'
      }
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true }
    ],
    'semi': [
      'error',
      'always'
    ],
    'indent': [
      'error',
      4
    ]
  },
}
