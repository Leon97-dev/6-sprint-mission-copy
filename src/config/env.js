// src/config/env.js
import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV !== 'production') {
  console.log(`🌐 NODE_ENV: ${process.env.NODE_ENV}`);
}
