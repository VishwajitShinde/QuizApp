import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Question } from '../../../model/Question';
import {MatSnackBar} from '@angular/material/snack-bar';

import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';

  question: Question = new Question();

  constructor(private formBuilder: FormBuilder, private quizService : QuizService, private route : Router, 
                private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    //let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'questionText': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      'option1': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'option2': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'option3': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'option4': [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'answer' : [null],
      'validate': ''
    });
  }

  onSubmit(form: NgForm) {
    
    console.log(this.question);

    this.quizService.addQuestion(this.question).subscribe(
      (data: any) => {
        // localStorage.clear();
        this._snackBar.open("Successfully updated new question to Question Bank!", "End Now", {
          duration: 5000,
        });
        console.log("here");
        console.log(form);
        form.resetForm();
        this.route.navigate(['add-questions'])
      }
    );
  }

/**
   * 
   * @param boxOrRadioEvent 
   * @param option 
   * @param isRadio 
   */
  markOptionAsAnswer(boxOrRadioEvent :any, option:any ) {
    console.log("Option is marked for Answer ", option, boxOrRadioEvent); 
    this.question.answer=option;
  }




}
