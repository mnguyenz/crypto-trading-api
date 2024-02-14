import dotenv from 'dotenv';
dotenv.config();

export const env = {
    APP_PORT: process.env.APP_PORT || 4001,
    BINANCE: {
        API_URL: process.env.BINANCE_API_URL,
        API_KEY: process.env.BINANCE_API_KEY,
        API_SECRET: process.env.BINANCE_API_SECRET
    }
};
