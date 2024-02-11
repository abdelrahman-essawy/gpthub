import { config } from 'dotenv';

console.log('Loading .env.e2e');
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const env = config({ path: '.env.e2e' });
console.log('env', env);
config({ path: '.env.e2e' });
