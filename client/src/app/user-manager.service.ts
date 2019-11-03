import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, throwError, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  loggedIn: boolean = false;
  username: string = "";
  token: string = "";
  connectionSub: Subscription = new Subscription();

  login(username: string, token: string): void {
    this.username = username;
    this.token = token;
    this.loggedIn = true;
  }

  logout(): void {
    this.username = "";
    this.loggedIn = false;
    this.connectionSub.unsubscribe();
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
        .subscribe((result) => {
          console.log("login result:", result);
          if (result) {
            this.login(username, result.token);
            this.monitorMessages();
            observer.next(true);
            observer.complete();
          } else {
            this.logout();
            observer.next(false);
            observer.complete();
          }
        });
    });
  }
  
  monitorMessages(): void {
    this.connectionSub = this.messagesService.connect(this.token).subscribe((status) => {
      if (status) {
        this.router.navigate(['/lounge']);
      } else {
        this.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  constructor(private router: Router, private http: HttpClient, private messagesService: MessagesService) {

  }
}
