module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: { node: true },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './tsconfig.eslint.json'
    ]
  },
  rules: {
    // '@typescript-eslint/strict-boolean-expressions': 'ignore',
    // '@typescript-eslint/prefer-nullish-coalescing': 'ignore'
  }
}
