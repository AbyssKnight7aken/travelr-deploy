import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) { }
  
  subscriptions: Subscription = new Subscription();
  errorMesssageFromServer!: string;
  validateEmail: boolean = true;

  loginHandler(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    console.log(loginForm.value);


    const existingUser$ = this.authService.login(loginForm.value).subscribe({
      next: (user) => {
        this.sessionService.createSession(user);
        console.log(user);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
    this.subscriptions.add(existingUser$);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }
}
