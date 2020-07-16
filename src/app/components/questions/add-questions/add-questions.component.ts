import { Component, OnInit } from '@angular/core';

import { Question } from '../question'
import { OptionType } from "../option-type"

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  public question:Question;
  public optionTypes = OptionType;

  constructor() { }

  ngOnInit(): void {
  }

}
