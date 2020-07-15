import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  nameTxt: string;
  emailIdTxt: string;
  phoneNoTxt: string;
  passwordTxt: string;
  hide = true;

  
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

  nameVal = new FormControl('', [Validators.required, Validators.min(3) ]);
  emailVal = new FormControl('', [Validators.required, Validators.email]);
  passwordVal = new FormControl('', [Validators.required, Validators.min(3) ]);


  getEmailErrorMessage() {
    if (this.emailVal.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailVal.hasError('email') ? 'Not a valid email' : '';
  }

  get getPasswordErrorMessage() { 
    if (this.passwordVal.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordVal.hasError('password') ? 'Not a valid password' : '';
  }  

  startTest(){
    console.log(this.nameTxt, this.emailIdTxt);
  }

}
