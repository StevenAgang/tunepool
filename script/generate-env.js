const fs = require('fs');

const targetPath = '../src/environment/environment.ts';
const envConfig = `
 export const Environment = {
    production: true,
    identity: '${process.env.Handshake}'
 };
`;

fs.writeFileSync(targetPath, envConfig);
