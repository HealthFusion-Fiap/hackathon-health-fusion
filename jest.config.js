const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/adapters/controllers/controller.ts',
    '<rootDir>/src/domain/errors',
    '<rootDir>/src/domain/repositories',
    '<rootDir>/src/domain/services',
    '<rootDir>/src/entities',
    '<rootDir>/src/infra/api',
    '<rootDir>/src/infra/database',
    '<rootDir>/src/infra/middlewares',
    '<rootDir>/src/infra/services',
    '<rootDir>/src/infra/validator',
    'index.ts',
    'dtos.ts',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,js,jsx}'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
