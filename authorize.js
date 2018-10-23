const jwt = require("express-jwt");
const jwtAuth = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

// code adapted from:
// https://auth0.com/docs/quickstart/backend/nodejs#configure-auth0-apis
const authorize = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    audience: `${process.env.AUTH0_AUDIENCE}`, // api identifier
    issuer: `${process.env.AUTH0_DOMAIN}/`, // auth0 domain
    algorithms: ["RS256"]
});

module.exports = authorize;
  