import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { QuizService } from 'src/app/services/quiz.service';
import { AuthService } from '../../../auth/auth.service';

import { SignIn } from 'src/app/model/signin'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signin: SignIn;

  isValid: boolean;
  hasError: boolean = false;
  hide: boolean = true;

  quizService: QuizService;

  public translate: TranslateService;

  constructor(translate: TranslateService, quizService: QuizService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService) {
    this.signin = new SignIn();
    this.translate = translate;

    translate.addLangs(['en', 'mar', 'hin']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.quizService = quizService;
  }

  ngOnInit(): void {
  }

  emailOrPhoneValidation = new FormControl('', [Validators.required, Validators.min(3)]);
  passwordValidation = new FormControl('', [
    Validators.required,
    Validators.pattern('(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$)')
  ]);

  getPasswordErrorMessage() {
    if (this.passwordValidation.hasError('required')) {
      return 'You must enter a value';
    }
    return this.passwordValidation.hasError('password') ? 'Not a valid password' : '';
  }

  getEmailOrPhoneErrorMessage() {
    if (this.emailOrPhoneValidation.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailOrPhoneValidation.hasError('password') ? 'Not a valid password' : '';
  }

  getErrorMessage() {
    if (!this.isValid && this.hasError) {
      return "Invalid email/phone Or password.!"
    }
    return "";
  }

  authenticate() {
    console.log(this.signin);
    this.quizService.signInUser(this.signin).subscribe(
      (data: any) => {
        this._snackBar.open("You have signed in successfully!", "Sign in", {
          duration: 5000,
        });
        console.log("response Data : ", data);
        this.authService.setToken( data.accessToken )
        console.log( "For Reference localStorage :", localStorage);
        this.route.navigate(['add-questions'])
      },
      (err : any) => {
        console.log("Exception from Backend : ", err); 
        this.authService.removeToken();
      }
    );
  }

}
