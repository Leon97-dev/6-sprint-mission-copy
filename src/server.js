// src/server.js
import http from 'http';
import app from './app.js';
import { env } from './config/env.js';

const server = http.createServer(app);

server.listen(env.port, () => {
  console.log(`🛜 포트 연결 성공: ${env.port}`);
});
