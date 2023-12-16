/* eslint-disable */
export default {
  displayName: 'gateway-e2e',
  preset: '../../../../jest.preset.js',
  globalSetup: '<rootDir>/grpc/support/global-setup.ts',
  globalTeardown: '<rootDir>/grpc/support/global-teardown.ts',
  setupFiles: ['<rootDir>/grpc/support/test-setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/gateway-e2e',
};
