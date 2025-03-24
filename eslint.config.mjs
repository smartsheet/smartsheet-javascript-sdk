import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    // Ignore patterns should be at the top level
    ignores: [
      "dist/**/*",
      "dist/**",
      "**/dist/**",
      "**/*_test.*",
      "**/test/**/*_test.js",
      "**/test/**/*.js",  // Ignore all JS files in test directory
      "**/test/mock-api/**"  // Specifically ignore all files in mock-api directory
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    // Apply to both JS and TS files
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"]
  },
  {
    // Convert specific rules to warnings for JavaScript files only
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-require-imports": "warn",
      "no-undef": "warn"
    }
  },
  // Add Prettier config last to disable conflicting rules
  prettierConfig
);
