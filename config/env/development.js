const development = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_DEV_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY
};

module.exports = development;
