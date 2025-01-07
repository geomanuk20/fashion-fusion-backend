import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const authMiddleware = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_ISSUER_BASE_URL,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
  algorithms: ["RS256"],
});

export default authMiddleware;
