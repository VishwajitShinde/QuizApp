import { Component } from '@angular/core';

import { Question } from '../question'
import { OptionType } from "../option-type"
import { Option } from '../option';
import { TimeUnit } from "../time-unit"

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent {

  public question: Question = new Question();
  public optionTypes = OptionType;
  public optionsArray: Object[];
  public hideMultipleOptionCheck:boolean=false;
  public answersObj: Object;
  public timeUnit:TimeUnit;

  constructor() {
    this.optionsArray = [];
    this.answersObj = {};
    this.optionsArray.push({ "number": 2, disabled: false, selected : false });
    this.optionsArray.push({ "number": 3, disabled: false, selected : false });
    this.optionsArray.push({ "number": 4, disabled: false, selected : true  });
    this.optionsArray.push({ "number": 5, disabled: false, selected : false });
    this.optionsArray.push({ "number": 6, disabled: false, selected : false });
  }

  /**
   * 
   */
  optionNumberChange() {
    var numberOfOptions = this.question.options.length - this.question.optionCount;
    while (numberOfOptions != 0) {
      if (numberOfOptions > 0) {
        this.question.options.pop();
        numberOfOptions--;
      } else {
        this.question.options.push(new Option((this.question.options.length + 1), ""));
        numberOfOptions++;
      }
    }
    
    if ( (this.question.options.length -2 ) < this.optionsArray.length )  
      this.optionsArray[ this.question.options.length -2 ]['selected'] = true;

    console.log(this.question);
  }

  /**
   * 
   */
  optionTypeChange() {
    this.optionsArray.forEach(function (option) {
      option['disabled'] = false;
      option['selected'] = false;
    });

    this.question.optionCount = 4;
    this.hideMultipleOptionCheck = false;

    if (this.question.optionType.valueOf() === OptionType.boolean.valueOf().toLocaleLowerCase() ) { 
      console.log( "Boolean Option Type Selected.")
      this.question.optionCount = 2;
      this.optionsArray.forEach(function (option) {
        if (option['number'] != 2) {
          option['disabled'] = true;
        }
      });
      this.hideMultipleOptionCheck = true;
    }
    this.optionNumberChange();
    console.log(this.question, this.optionsArray);
  }

  /**
   * markOptionAsAnswer
   */
  markOptionAsAnswer(checkboxEvent :any, option:Option) {
    console.log("Option is marked for Answer ", option);
    if ( this.answersObj.hasOwnProperty('num') ) {
      if ( checkboxEvent.target.checked == false ) {
        delete this.answersObj[option.num]
      } 
    } else {
      if ( checkboxEvent.target.checked == true ) {
        this.answersObj[ option.num ] = option; 
      } 
    }
    console.log( "Answers ", this.answersObj);
  }

  /**
   * Final Method To Update Or Submit New Question For question Bannk
   */

  addOrUpdateQuestionToQuestionBank() {
    Object.keys(this.answersObj).forEach(function(key) {
      this.question.answers.push(this.answersObj[key]);
  });
    console.log("Submit Action clicked ", this.question);
    this.question=new Question();
  }

}
