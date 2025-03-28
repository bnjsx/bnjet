/**
 * Jest Configuration for running tests in BNJSX project.
 *
 * Jest is pre-configured for you. To run your tests, simply execute: `npm run test`
 *
 * Test files should be placed in the "test" folder at the root of the project.
 * All test files should use the ".test.ts" extension.
 *
 * Configuration Breakdown:
 * - `testEnvironment`: Tests will run in a Node.js environment.
 * - `testMatch`: Specifies the pattern for matching test files (`*.test.ts`).
 * - `moduleFileExtensions`: Support for TypeScript and JavaScript files.
 * - `transform`: Uses `ts-jest` to transform TypeScript files.
 * - `clearMocks`: Resets mocks after each test.
 * - `collectCoverage`: Enables test coverage collection.
 * - `collectCoverageFrom`: Collects coverage from `.test.ts` files in the `src` directory.
 * - `coverageDirectory`: Specifies where to store coverage reports (`/coverage`).
 * - `coverageReporters`: Formats for coverage reports (JSON, text, LCOV, and Clover).
 * - `verbose`: Outputs detailed information for each test.
 */
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.server.json' }] },
  collectCoverage: true,
  coverageProvider: 'v8', // Use Node's native coverage instead of babel
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
};
