import { OptionType } from "./option-type"
import { Option } from "./option"

export class Question {

    public id: number;
    public question: string;
    public image?: string;

    public optionCount: number;
    public optionType: OptionType;
    public options: Option[];

    constructor() { 
        this.options = [];
     }
     
  }