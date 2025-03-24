import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // Ignore patterns should be at the top level
    ignores: [
      'dist/**/*',
      'dist/**',
      '**/dist/**',
      '**/*_test.*',
      '**/test/**/*_test.js',
      '**/test/**/*.js', // Ignore all JS files in test directory
      '**/test/mock-api/**', // Specifically ignore all files in mock-api directory
    ],
  },

  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    // Apply to both JS and TS files
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
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
    },
  },
  {
    // Convert specific rules to warnings for JavaScript files only
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-undef': 'warn',
      // Also configure standard no-unused-vars for JS files
    },
  },
  // Add Prettier config last to disable conflicting rules
  prettierConfig
);
