import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { Signup } from '../../../model/Signup';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  signup: Signup = new Signup();

  formGroup: FormGroup;
  
  public translate: TranslateService;

  typesOfUser: Role[] = [{"name": "ROLE_STUDENT", "value": "I'm a Student"}, 
                            {"name": "ROLE_TEACHER", "value": "I'm a Teacher"}, 
                            {"name": "ROLE_PARENT", "value": "I'm a Parent"}];

  constructor(private formBuilder: FormBuilder, translate: TranslateService, private quizService : QuizService,  private route : Router, 
    private _snackBar: MatSnackBar) {
    this.translate = translate;

    translate.addLangs(['en', 'mar', 'hin']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
}

  ngOnInit(): void {
    this.createForm();
  }

  nameVal = new FormControl('', [Validators.required, Validators.min(3) ]);
  emailVal = new FormControl('', [Validators.required, Validators.email]);
  passwordVal = new FormControl('', [Validators.required, Validators.pattern('(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$)') ]);


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

    return this.passwordVal.hasError('password') ? 'Not a valid password [must contain UpperCase, Lowercase, Special Char (?!.*) and length ( 8 to 20 )]' : '';
  }  

  startTest(){
    console.log(this.nameTxt, this.emailIdTxt);
  }

  createForm() {
    //let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'firstName': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      'lastName': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      'email': [null, [Validators.required, Validators.email]],
      'mobile': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('(^$|[0-9]{10})')]],
      'password': [null, [Validators.required,  Validators.pattern('(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$)') ]],
      'userTypeRole': [null],
      
      'validate': ''
    });
  }

  onSubmit(form: NgForm) {
    
    var roleArr = [];
    roleArr.push(this.signup.role);
    console.log(this.signup.role);
    this.signup.role = roleArr;
    console.log(this.signup);


    this.quizService.signupUser(this.signup).subscribe(
      (data: any) => {
        // localStorage.clear();
        this._snackBar.open("You have signed up successfully!", "Sign in", {
          duration: 5000,
        });
        console.log("here");
        this.signup = new Signup(); // resseting truly
        console.log(form);
        form.resetForm();
        this.route.navigate(['add-questions'])
      }
    );
  }
}

interface Role{
  name: string;
  value: string;
}