import { OptionType } from "./option-type"
import { Option } from "./option"
import { TimeUnit } from "./time-unit"

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
    public timeUnit:TimeUnit=TimeUnit.SECONDS;

    constructor() { 
        this.options = [];
        this.answers = [];
     }

  }