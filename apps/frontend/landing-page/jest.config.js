"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
exports.default = {
    displayName: 'landing-page',
    preset: '../../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/apps/frontend/landing-page',
};
