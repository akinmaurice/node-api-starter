const development = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_DEV_URL,
    REDIS_URI: process.env.REDIS_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY

};

module.exports = development;
