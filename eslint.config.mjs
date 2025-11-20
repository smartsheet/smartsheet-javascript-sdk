import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import tsdoc from 'eslint-plugin-tsdoc';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/smartsheet-sdk-tests/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    // Apply to both JS and TS files
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      tsdoc,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      // Allow unused variables if they start with underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'tsdoc/syntax': 'warn',
    },
  },
  {
    // Apply to Javascript files only:
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-undef': 'warn',
    },
  },
  prettierConfig
);
