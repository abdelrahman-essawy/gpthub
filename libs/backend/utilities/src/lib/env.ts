export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const NODE_ENV = ((): Env => {
  const _env = process.env['NODE_ENV'];
  switch (_env) {
    case Env.Development:
      return Env.Development;
    case Env.Production:
      return Env.Production;
    case Env.Test:
      return Env.Test;
    default:
      throw new Error('NODE_ENV is not set = ' + _env);
  }
})();

export const suitableEnvFilePath = ((): string => {
  switch (NODE_ENV) {
    case Env.Development:
      return '.env.dev';
    case Env.Production:
      return '.env.prod';
    case Env.Test:
      return '.env.test';
    default:
      throw new Error('NODE_ENV is not set = ' + NODE_ENV);
  }
})();
