import { Injectable, EventEmitter } from '@angular/core';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket: any;
  newMessage: EventEmitter<string> = new EventEmitter();

  connect(): void {
    this.socket = io('http://localhost:3001'); 
    this.socket.on("connect", () => {
      console.log("CONNECTED!");
    });

    this.socket.on("message", (msg) => {
      console.log("message:", msg);
      this.newMessage.emit(msg);
    });

    this.socket.on("connect_error", (err) => {
      console.log("ERROR:", err);
    });
  }

  changeRoom(newRoom: string): void {
    this.socket.emit("room_change", newRoom);
  }

  sendMessage(msg: string): void {
    console.log("EMIT");
    this.socket.emit("message", msg);
  }

  constructor() { }
}
