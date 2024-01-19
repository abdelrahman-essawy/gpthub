"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
exports.default = {
    displayName: 'grpc',
    preset: '../../../../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../../../coverage/libs/backend/communication/internal/grpc',
};
