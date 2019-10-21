import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  loginStatus: EventEmitter<boolean> = new EventEmitter();
  loggedIn: boolean = false;
  username: string = "";

  login(username: string): void {
    this.username = username;
    this.loggedIn = true;
    this.loginStatus.emit(true);
  }

  logout(): void {
    this.username = "";
    this.loggedIn = false;
    this.loginStatus.emit(false);
  }

  attemptLogin(username: string): void {
    // JJV DEBUG - for devel, assume good login
    this.login(username);
  }

  constructor() { }
}
