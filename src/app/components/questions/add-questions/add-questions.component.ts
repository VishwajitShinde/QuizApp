import { Component } from '@angular/core';

import { Question } from '../question'
import { OptionType } from "../option-type"
import { Option } from '../option';
import { TimeUnitValue } from "../time-unit-value"

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
  public timeUnitValue = TimeUnitValue;

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
   * 
   */
  clearSelectedAnswerOption()
  {
    console.log("Before Clearing Answers : ", this.answersObj );
    this.answersObj = {};
  }

  /**
   * 
   * @param boxOrRadioEvent 
   * @param option 
   * @param isRadio 
   */
  markOptionAsAnswer(boxOrRadioEvent :any, option:Option, isRadio:boolean) {
    console.log("isRadio Button : ", isRadio )
    console.log("Option is marked for Answer ", option, boxOrRadioEvent); 
    if( isRadio ) {
      //boxOrRadioEvent.value;
      this.answersObj = {};
      this.answersObj[ option.num ] = option; 
    } else {
      var isChecked:boolean =  boxOrRadioEvent.checked;
      if ( this.answersObj.hasOwnProperty('num') ) {
        if ( !isChecked) {
          delete this.answersObj[option.num]
        } 
      } else {
        if ( isChecked ) {
          this.answersObj[ option.num ] = option; 
        } 
      }
    } 

    console.log( "Answers ", this.answersObj );
  }

  /**
   * Final Method To Update Or Submit New Question For question Bannk
   */

  addOrUpdateQuestionToQuestionBank() {
    for (let key in this.answersObj) {
      this.question.answers.push(this.answersObj[key]);
    }
    console.log("Submit Action clicked ", this.question);
    this.question=new Question();
  }

}
