
export class Option {

    public num: number;
    public value: string;

    constructor(num, value) {
        this.num = num;
        this.value = value;
    }

    public getValue() {
        return this.value;
    }

    public getNumber() {
        return this.num;
    }

}