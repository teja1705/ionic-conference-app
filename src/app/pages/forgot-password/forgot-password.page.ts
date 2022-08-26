import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForgotPasswordOptions } from '../../interfaces/user-options';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPassword : ForgotPasswordOptions = { username: '', email: '' };

  actionInProgress$ : Observable<any>
  submitted : boolean = false


  constructor(private router : Router, private predictionFacade : PredictionStoreFacade, private authFacade : AuthStoreFacade) { 
    this.actionInProgress$ = this.authFacade.actionInProgress$;
  }

  ngOnInit() {
  }

  login($event){
    this.router.navigateByUrl('/login')
  }

  sendForgotPassword() {
    this.submitted = true;
    let passwordRequest = Object.create({});
    passwordRequest.email = this.forgotPassword.email;
    passwordRequest.username = this.forgotPassword.username.trim().toLowerCase();
  }

}
