import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',                 // 프로젝트 루트 backend/
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  moduleNameMapper: {
    '^prisma/(.*)$': '<rootDir>/prisma/$1',  // alias 매핑 (backend/prisma)
    '^src/(.*)$': '<rootDir>/src/$1',        // alias 매핑 (backend/src)
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',         // 테스트용 tsconfig
    },
  },
};

export default config;