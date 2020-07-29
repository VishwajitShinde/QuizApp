import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  emailId: string;
  valid: boolean;

  constructor( private quizService : QuizService,private route : Router) { }
  
  ngOnInit(): void {
  }

  emailValidation = new FormControl('', [Validators.required, Validators.email]);
  nameValidation = new FormControl('', [Validators.required, Validators.minLength(2) ]);

  getEmailErrorMessage() { 
    this.updateValidationStatus();
    if (this.emailValidation.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailValidation.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() { 
    console.log ( this.nameValidation );
    this.updateValidationStatus();
    if (this.nameValidation.hasError('required')) {
      return 'You must enter a value';
    }
    
    return this.nameValidation.hasError('name') ? 'Minimum 3 Characters required' : '';
  }

  updateValidationStatus() {
    this.valid = (  
       !this.emailValidation.hasError('required') 
    && !this.emailValidation.hasError('email') 
    && !this.nameValidation.hasError('required') 
    && !this.nameValidation.hasError('name') 
     ) ?  true : false ;
  }

  registerParticipent(){
    if ( !this.valid )
      return;

    console.log(this.name, this.emailId);
    this.quizService.registerParticipant(this.name, this.emailId).subscribe(
      (data : any) =>{
        localStorage.clear();
        localStorage.setItem('participant',JSON.stringify(data));
        this.route.navigate(['/quiz']);
      }
    );
  }

}
