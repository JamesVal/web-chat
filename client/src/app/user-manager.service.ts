import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  loggedIn: boolean = false;
  username: string = "";
  token: string = "";

  login(username: string, token: string): void {
    this.username = username;
    this.token = token;
    this.loggedIn = true;
    this.messagesService.connect(token);
  }

  logout(): void {
    this.username = "";
    this.loggedIn = false;
  }

  attemptLogin(username: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(environment.API_URL+"/login", {username: username})
        .pipe(
          catchError(err => {
            console.log("post error", err);
            observer.next(false);
            observer.complete();
            return throwError(new Error("Server Error"));
          })
        )
        .subscribe((response) => {
          if (response.result == "success") {
            console.log(response);
            this.login(username, response.token);
            observer.next(true);
            observer.complete();
          } else {
            console.log("Login Error");
            this.logout();
            observer.next(false);
            observer.complete();
          }
        });
    });
  }
  
  constructor(private http: HttpClient, private messagesService: MessagesService) {

  }
}
