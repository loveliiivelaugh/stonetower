
const trustedSources: string[] = [
    Bun.env.OPENFITNESS_HOSTNAME as string,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
];

const allowedHeaders: string[] = [
    'authorization', 
    'auth-token',
    'Content-Type'
];

const corsConfig = {
    origin: trustedSources, 
    allowHeaders: allowedHeaders,
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
};

export { corsConfig };