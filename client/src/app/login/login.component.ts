import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserManagerService } from '../user-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSubscription: Subscription = new Subscription();
  username: string = "";

  login(): void {
    this.userManagerService.attemptLogin(this.username);
  }

  constructor(private router: Router, private userManagerService: UserManagerService) { }

  ngOnInit() {
    this.loginSubscription = this.userManagerService.loginStatus.subscribe((status) => {
      if (status) {
        console.log("Logged In As: ", this.userManagerService.username);
        this.router.navigate(['/lounge']);
      }
    })
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
