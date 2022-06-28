import Calculator from "./Calculator";

let calcCount = -1;
let calculators: Calculator[] = [];
let contentElem: HTMLElement;

function addCalculator() {
    let calcDiv = document.createElement("div");
    calcDiv.classList.add("container", "my-3", `${"calc" + ++calcCount}` );
    calcDiv.innerHTML = `
        <div class="col-md-4 mx-auto">
            <input style="text-align: right" class="form-control calc-display"readonly value="0"/>
            </br>
            <div class="row">
                <button class="col btn-lg btn-warning calc-opBtn" value="add">+</button>
                <button class="col btn-lg btn-warning calc-opBtn" value="sub">-</button>
                <button class="col btn-lg btn-warning calc-opBtn" value="mul">*</button>
                <button class="col btn-lg btn-warning calc-opBtn" value="div">/</button>
                <button class="col btn-lg btn-warning calc-opBtn" value="clr">C</button>
            </div>
            </br>
            <div class="row">
                <button class="col btn-lg btn-primary calc-numberBtn" value="1">1</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="2">2</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="3">3</button>
            </div>
            <div class="row">
                <button class="col btn-lg btn-primary calc-numberBtn" value="4">4</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="5">5</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="6">6</button>
            </div>
            <div class="row">
                <button class="col btn-lg btn-primary calc-numberBtn" value="7">7</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="8">8</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value="9">9</button>
            </div> 
            <div class="row">
                <button class="col btn-lg btn-primary calc-numberBtn" value="0">0</button>
                <button class="col btn-lg btn-primary calc-numberBtn" value=".">.</button>
                <button class="col btn-lg btn-primary calc-opBtn" value="neg">+/-</button>
            </div>
            <div class="row">
                <button class="col btn-lg btn-success calc-opBtn" value="res">=</button>
            </div>
        </div>
    `;

    contentElem.append(calcDiv);

    calculators.push(new Calculator(calcDiv));
}

function removeCalculator() {
    if (calcCount == -1)
        return;

    let calcDiv: HTMLElement | null = contentElem.querySelector(`.${"calc" + calcCount--}`);

    if (calcDiv !== null)
    {
        calcDiv.remove();
        calculators.pop();
    }
}

function renderPage() {
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("px-4", "py-5", "my-5", "text-center");
    contentDiv.innerHTML =`<h1 class="display-5 fw-bold">Calculator(s)</h1>`;
    
    let btnAdd = document.createElement("button");
    btnAdd.classList.add("btn","btn-primary");
    btnAdd.textContent = "Add Calculator";
    btnAdd.onclick = function(){
        addCalculator();
    }

    contentDiv.appendChild(btnAdd);

    let btnRemove = document.createElement("button");
    btnRemove.classList.add("btn", "btn-secondary");
    btnRemove.textContent = "Remove Calculator";
    btnRemove.onclick = function(){
        removeCalculator();
    }
    contentDiv.appendChild(btnRemove);

    btnRemove.after(document.createElement("br"));

    document.body.prepend(contentDiv);

    contentElem = contentDiv;
}

renderPage();