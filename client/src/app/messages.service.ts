import { Injectable, EventEmitter } from '@angular/core';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket: any;
  token: string;
  newMessage: EventEmitter<string> = new EventEmitter();
  connectStatus: EventEmitter<number> = new EventEmitter();

  connect(token: string): void {
    this.token = token;
    this.socket = io('http://localhost:3001?token='+token); 
    this.socket.on("connect", () => {
      console.log("Connected!");
    });

    this.socket.on("message", (msg) => {
      this.newMessage.emit(msg);
    });

    this.socket.on("connect_error", (err) => {
      console.log("connect_error:", err);
    });

    this.socket.on("error", (err) => {
      console.log("err:", err);
    })
  }

  changeRoom(newRoom: string): void {
    this.socket.emit("room_change", newRoom);
  }

  sendMessage(msg: string): void {
    this.socket.emit("message", msg);
  }

  constructor() { }
}
