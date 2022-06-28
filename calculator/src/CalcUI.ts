export default class CalcUI {
    displayElem: HTMLInputElement | null;

    constructor(parentElem: HTMLElement) {
        this.displayElem = parentElem.querySelector(".calc-display");

        let numberBtns = parentElem.querySelectorAll<HTMLInputElement>(".calc-numberBtn");

        numberBtns.forEach((elem: HTMLInputElement) => {
            (elem).onclick = () => {
                this.input(elem.value)
            }
        });
    }

    input(value: string) {
        if (value == '.') { // input decimal point
            if (!this.displayElem?.value.includes('.') && (this.displayElem!.value.split('.').length - 1) < 1)
                this.displayElem!.value = this.displayElem!.value + value;
        } // input number
        else if (this.displayElem!.value != '0' || this.displayElem!.value.length != 1) {
            this.displayElem!.value = this.displayElem!.value + value;
        } // input first number
        else {
            this.displayElem!.value = value;
        }
    }

    getVal(): number {
        return parseFloat(this.displayElem!.value);
    } 

    setVal(value: number) {
        this.displayElem!.value = value.toString();
    }

    popVal(): number {
        let val = this.displayElem!.value;
        this.displayElem!.value = '0';

        return parseFloat(val);
    }

}
