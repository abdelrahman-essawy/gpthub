export enum Env {
  Development = 'development',
  Production = 'production',
  E2E = 'e2e',
  Test = 'test',
}

export const NODE_ENV = ((): Env => {
  const _env = process.env['NODE_ENV'];
  switch (_env) {
    case Env.Development:
      return Env.Development;
    case Env.Production:
      return Env.Production;
    case Env.E2E:
    case Env.Test:
      return Env.E2E;
    default:
      throw new Error('NODE_ENV is not familiar, received: ' + _env);
  }
})();

export const suitableEnvFilePath = ((): string => {
  switch (NODE_ENV) {
    case Env.Development:
      return '.env.dev';
    case Env.Production:
      return '.env.prod';
    case Env.E2E:
    case Env.Test:
      return '.env.e2e';
    default:
      throw new Error('NODE_ENV is not familiar, received: ' + NODE_ENV);
  }
})();
