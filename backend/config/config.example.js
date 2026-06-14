export default {
    secretKey: process.env.JWT_SECRET,
    tokenIssuer: process.env.JWT_ISSUER,
    tokenExpiration: process.env.JWT_EXPIRATION,
    tokenAlgorithm: process.env.JWT_ALGORITHM,
};
