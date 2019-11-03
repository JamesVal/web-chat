function User(username, token) {
  this.username = username;
  this.token = token;
  this.isConnected = false; 
  this.socket = null;
}

User.prototype.setConnectStatus = function(status) {
  this.isConnected = status;
}

User.prototype.getConnectStatus = function() {
  return this.isConnected;
}

User.prototype.getToken = function() {
  return this.token;
}

User.prototype.setupSocket = function(socket, io) {
  this.socket = socket;

  this.socket.on("room_change", (newRoom) => {
    let rooms = Object.keys(this.socket.rooms);
    /* The first room is the Socket ID itself, so skip it */
    for (let i = 1; i < rooms.length; i++) {
      this.socket.leave(rooms[i]);
    }
    console.log(this.socket.id, "joined", newRoom);
    this.socket.join(newRoom);
  });

  this.socket.on("message", (msg) => {
    let rooms = Object.keys(this.socket.rooms);
    io.to(rooms[1]).emit("message", {username: this.username, message: msg});
    console.log("message:", msg);
  })

  this.socket.on("disconnecting", (reason) => {
    console.log("disconnecting:", reason)
  });

  this.socket.on("disconnect", (reason) => {
    console.log("disconnected:", reason)
  });
}

User.prototype.clearSocket = function() {
  this.socket = null;
}

module.exports = User;