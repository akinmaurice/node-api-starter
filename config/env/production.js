const production = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_PROD_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY
};

module.exports = production;
