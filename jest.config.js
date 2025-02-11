/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/avonjs/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
  },
};
