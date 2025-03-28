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
 * - `collectCoverage`: Enables test coverage collection.
 * - `collectCoverageFrom`: Collects coverage from `.js` files in the `src` directory.
 */
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
};
