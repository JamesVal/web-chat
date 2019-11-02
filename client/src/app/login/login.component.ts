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
  username: string = "";
  waitingForResult: boolean = false;

  login(): void {
    if (!this.waitingForResult) {
      this.waitingForResult = true;
      this.userManagerService.attemptLogin(this.username).subscribe((result) => {
        console.log("login result:", result);
        this.waitingForResult = false;
        if (result) {
          console.log("Logged In As: ", this.userManagerService.username);
          //this.router.navigate(['/lounge']);
        }
      });
    }
  }

  constructor(private router: Router, private userManagerService: UserManagerService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
