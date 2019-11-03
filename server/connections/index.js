const userManager = require('../user-manager');

/* Setup Sockets */
const io = require('socket.io')(3001);

// Check token
io.use((socket, next) => {
  let token = socket.handshake.query.token;
  let user = userManager.findUserByToken(token);
  if (user && !user.getConnectStatus()) {
    return next();
  }
  return next(new Error('authentication error'));
});

io.on("connection", (socket) => {
  let token = socket.handshake.query.token;
  let user = userManager.findUserByToken(token);

  console.log("connected:", socket.id);

  user.setupSocket(socket, io);
});

io.on('connect_timeout', (timeout) => {
  console.log("timeout:", timeout);
});

