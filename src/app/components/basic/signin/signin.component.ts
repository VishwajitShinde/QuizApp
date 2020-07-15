import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  emailOrPhoneTxt: string;
  passwordTxt: string;
  isValid: boolean;
  hasError: boolean = false;
  hide:boolean = true;

  public translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;

    translate.addLangs(['en', 'mar', 'hin']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}

  ngOnInit(): void {
  }

  
  emailOrPhoneValidation = new FormControl('', [Validators.required, Validators.min(3) ]);
  passwordValidation = new FormControl('', [Validators.required, Validators.min(3) ]);

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
      if ( !this.isValid && this.hasError) {
        return "Invalid email/phone Or password.!"
      }
      return "";
 }

  authenticate() {

    console.log(this.emailOrPhoneTxt, this.passwordTxt);
    if ( this.emailOrPhoneTxt === this.passwordTxt ) { 
        this.isValid = true; 
        this.hasError = false;
    } else {
      this.isValid = false ;
      this.hasError = true;
    }
  }

}
