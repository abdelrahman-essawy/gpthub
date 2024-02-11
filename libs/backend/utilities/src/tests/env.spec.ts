import { Env, NODE_ENV, suitableEnvFilePath } from '../lib/env';

describe('NODE_ENV configuration', () => {
  describe('NODE_ENV', () => {
    it('should be one of the enum values', () => {
      expect(NODE_ENV).toMatch(/development|production|test/);
    });
  });

  describe('suitableEnvFilePath', () => {
    it('should return a suitable file path based on NODE_ENV', () => {
      switch (NODE_ENV) {
        case Env.Development:
          expect(suitableEnvFilePath).toBe('.env.dev');
          break;
        case Env.Production:
          expect(suitableEnvFilePath).toBe('.env.prod');
          break;
        case Env.E2E:
          expect(suitableEnvFilePath).toBe('.env.e2e');
          break;
        default:
          throw new Error('Unexpected NODE_ENV value');
      }
    });
  });
});
