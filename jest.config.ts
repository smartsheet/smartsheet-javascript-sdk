import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts', '**/test/**/*.spec.js'],
  collectCoverageFrom: ['lib/**/*.{js,ts}', '!lib/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  extensionsToTreatAsEsm: ['.ts'],
  reporters: [['github-actions', { silent: false }], 'summary'],
  moduleNameMapper: {
    '^@smartsheet$': '<rootDir>/index.ts',
    '^@smartsheet/(.*)$': '<rootDir>/lib/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
