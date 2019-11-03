import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket: any;
  token: string;
  newMessage: EventEmitter<string> = new EventEmitter();

  connect(token: string): Observable<any> {
    return new Observable((observer) => {
      this.token = token;
      this.socket = io('http://localhost:3001?token='+token); 
      this.socket.on("connect", () => {
        console.log("Connected!");
        observer.next(true);
      });

      this.socket.on("message", (msg) => {
        this.newMessage.emit(msg);
      });

      this.socket.on("connect_error", (err) => {
        console.log("connect_error:", err);
        observer.next(false);
      });

      this.socket.on("error", (err) => {
        console.log("err:", err);
        observer.next(false);
      });
    });
  }

  changeRoom(newRoom: string): void {
    this.socket.emit("room_change", newRoom);
  }

  sendMessage(msg: string): void {
    this.socket.emit("message", msg);
  }

  constructor() { }
}
