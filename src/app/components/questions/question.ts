import { OptionType } from "./option-type"
import { Option } from "./option"
import { TimeUnitValue } from "./time-unit-value"

export class Question {

    public id: number;
    
    public question: string;
    public image?: string;

    public optionCount: number=4;
    public optionType: OptionType = OptionType.text;
    public options: Option[];

    public answers: Option[];
    public hasMultipleAns:boolean=false;
    public expectedTimeToAnswer:number=60;
    public timeUnitValue:TimeUnitValue=TimeUnitValue.SECONDS;

    constructor() { 
        this.options = [];
        this.answers = [];
     }

  }