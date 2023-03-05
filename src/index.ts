import express from 'express';
// import socket from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';

import './core/db';
import createRoutes from './core/routes';

const app = express();
const http = createServer(app);
// const io = require('socket.io')(http);

dotenv.config();

createRoutes(app);

// io.on('connection', function (socket: any) {
//   console.log('Connected');
//   socket.emit('111', 'qwe');

//   socket.on('222', function (msg: any) {
//     console.log('message: ' + msg);
//   });
// });

http.listen(3001, function () {
  console.log(`Server: http://localhost:${3001}`);
});
