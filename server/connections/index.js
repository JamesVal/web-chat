/* Setup Sockets */
const io = require('socket.io')(3001);

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

/*
  socket.join("lounge", () => {
    let rooms = Object.keys(socket.rooms);
    console.log(rooms);
    socket.to("lounge").emit("greeting","I HAVE ARRIVED");
  });
*/

  socket.on("room_change", (newRoom) => {
    let rooms = Object.keys(socket.rooms);
    /* The first room is the Socket ID itself, so skip it */
    for (let i = 1; i < rooms.length; i++) {
      socket.leave(rooms[i]);
    }
    console.log(socket.id, "joined", newRoom);
    socket.join(newRoom);
  });

  socket.on("message", (msg) => {
    let rooms = Object.keys(socket.rooms);
    io.to(rooms[1]).emit("message", msg);
    console.log("message:", msg);
  })

  socket.on("disconnecting", (reason) => {
    console.log("disconnecting:", reason)
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected:", reason)
  });
});

io.on('connect_timeout', (timeout) => {
  console.log("timeout:", timeout);
});

