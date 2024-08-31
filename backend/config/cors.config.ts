
const trustedSources: string[] = [
    Bun.env.HOSTNAME as string,
    'http://localhost:3001',
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