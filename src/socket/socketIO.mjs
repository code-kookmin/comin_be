import https from 'https';
import sslKeys from '../config/sslKey.mjs';
import { Server } from 'socket.io';

const PORT_SOCKET = process.env.PORT_SOCKET || 3500;

const socketIO = (app) => {
  let httpServer = https.createServer(sslKeys, app).listen(PORT_SOCKET, () => {
    logger.info(`socket.io : ${PORT_SOCKET} 포트에 연결되었습니다!`);
  });

  // socket 서버
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    // 접속자 수
    socket.emit('usercount', { count: io.engine.clientsCount });
  });

  return io;
};

export { socketIO };
