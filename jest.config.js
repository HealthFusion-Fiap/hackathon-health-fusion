const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/adapters/gateways',
    '<rootDir>/app/domain/services',
    '<rootDir>/app/domain/repositories',
    '<rootDir>/app/infra/bootstrap.ts',
    '<rootDir>/app/infra/config',
    '<rootDir>/app/infra/db',
    '<rootDir>/app/infra/http',
    '<rootDir>/app/infra/validator',
    'index.ts',
    'dtos.ts',
    'gateway.ts',
  ],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  moduleDirectories: ['node_modules', 'app'],
  collectCoverage: false,
  collectCoverageFrom: ['app/**/*.{ts,js,jsx}'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
