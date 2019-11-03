const User = require('../user');

function UserManager() {
  this.userList = [];
}

UserManager.prototype.addUser = function(username, token) {
  let newUser = new User(username, token);
  console.log("adding user:", newUser);
  this.userList.push(newUser);
}

UserManager.prototype.userConnected = function(token) {
  for (let i = 0; i < this.userList.length; i++) {
    if (token === this.userList[i].getToken()) {
      this.userList[i].setConnectStatus(true);
      break;
    }
  }
}

UserManager.prototype.findUserByToken = function(token) {
  let retVal = null;
  for (let i = 0; i < this.userList.length; i++) {
    if (token === this.userList[i].getToken()) {
      retVal = this.userList[i];
      break;
    }
  }
  return retVal;
}

module.exports = new UserManager();