import CalcUI from "./CalcUI";

export default class Calculator {
    private display: CalcUI; 

    private lastNr: number | null = null;
    private prevOp: string | null = null; 

    constructor(parentElem: HTMLElement) {
        this.display = new CalcUI(parentElem);

        let opBtns = parentElem.querySelectorAll<HTMLInputElement>(".calc-opBtn")

        opBtns.forEach((elem: HTMLInputElement) => {
            elem.onclick = () => {
                this.performOp(elem.value)
            }
        });
    }

    performOp(op: string) {
        if (this.lastNr == null && op != "clr" && op != "neg") {
            this.lastNr = this.display.popVal();
        }
        else {
            switch (op) {
                case "add": // binary operations
                case "sub":
                case "mul":
                case "div":
                    this.calculate();
                    break;
                case "clr": // clear
                    this.prevOp = null;
                    this.lastNr = null;
                    this.display.setVal(0);
                    return;
                case "res": // result
                    this.calculate();
                    this.display.setVal(this.lastNr!);
                    this.prevOp = null;
                    this.lastNr = null;
                    return;
                case "neg": // negate
                    this.display.setVal((this.display.getVal()) * -1);
                    return;
                default: 
                    alert("unknown operation")
                    return;
            }
        }
        this.display.setVal(0);
        this.prevOp = op;
    }
    
    calculate() {
        let newVal;
        switch (this.prevOp) {
            case "add":
                newVal = this.lastNr! + this.display.popVal();
                break;
            case "sub":
                newVal = this.lastNr! - this.display.popVal();
                break;
            case "mul":
                newVal = this.lastNr! * this.display.popVal();
                break;
            case "div":
                if (this.display.getVal() == 0.0) {
                    alert("Division by zero!")
                    return;
                }
                newVal = this.lastNr! / this.display.popVal();
                break;
            default:
                newVal = this.lastNr;
        }
        this.lastNr = Math.round(newVal! * 100) / 100
        this.prevOp = null;
    }
}

