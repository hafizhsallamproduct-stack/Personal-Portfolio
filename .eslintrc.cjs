module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', 'prettier'],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.test.{js,jsx}', 'src/test/**/*.{js,jsx}'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
      },
    },
  ],
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'warn',
    // Section tabIndex={0} is intentional — keyboard users land on sections
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    // Apostrophes in JSX text render fine; escaping hurts readability
    'react/no-unescaped-entities': 'off',
  },
};
