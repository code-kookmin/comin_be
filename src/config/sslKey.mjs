import fs from 'fs';

let sslKeys = {};
// SSL 인증서 키
sslKeys = {
  ca: fs.readFileSync(`/etc/letsencrypt/live/${process.env.SERVER_DOMAIN}/fullchain.pem`),
  key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.SERVER_DOMAIN}/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.SERVER_DOMAIN}/cert.pem`),
};

export default sslKeys;
