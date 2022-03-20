let result = 0;
let entry = 0;
let operator = '';
let hasDecimal = false;

let resultDisp = document.querySelector("#result");
let entryDisp = document.querySelector("#entry");

function Operate(l, operator, r) {
    if (operator === '+')
        return l + r;
    if (operator === '-')
        return l - r;
    if (operator === '*')
        return l * r;
    if (operator === '/')
        return l / r;
}

function UpdateResultDisplay() {
    if (operator !== '')
        resultDisp.innerText = `${result} ${operator}`;
    else
        resultDisp.innerText = `${result}`;
}

function AddDigit(x) {
    if (entryDisp.innerText.length > 10)
        return;

    entryDisp.innerText += x;
    entry = Number(entryDisp.innerText);
}

function AddOperator(oper) {
    if (entryDisp.innerText !== "") {
        entryDisp.innerText = "";
        if (resultDisp.innerText !== "" && operator !== '')
            result = Operate(result, operator, entry);
        else    
            result = entry;
        entry = 0;
    }
    
    operator = oper;
    UpdateResultDisplay();
    // if (resultDisp.innerText === "")
    //     result = entry;
    // else {
    //     if (operator !== "")
    //         result = Operate(result, operator, entry);
    //     else    
    //         result = entry;
    // }
    
    // operator = oper;
    // entryDisp.innerText = "";
    // entry = 0;
    // UpdateResultDisplay();
}

function AddPointToEntry() {
    if (hasDecimal)
        return; 

    hasDecimal = true;
    entryDisp.innerText += (entryDisp.innerText === "" ? "0." : '.');
    entry = Number(entryDisp.innerText);
}

function Calculate() {
    if (operator !== '') {
        result = Operate(result, operator, entry);
        entry = 0;
        entryDisp.innerText = "";
        operator = '';
        UpdateResultDisplay();
    }
    else {
        result = entry;
        entry = 0;
        entryDisp.innerText = "";
        UpdateResultDisplay();
    }
}

function Clear() {
    result = 0;
    entry = 0;
    operator = '';
    hasDecimal = false;

    resultDisp.innerText = "";
    entryDisp.innerText = "";
}

function CancelEntry() {
    entry = 0;
    entryDisp.innerText = "";
}

function Delete() {
    let str = entryDisp.innerText;
    if (str.length > 0) {
        if (str[str.length - 1] === '.')
            hasDecimal = false;

        entryDisp.innerText = str.substring(0, str.length - 1); 

        entry = entryDisp.innerText === "" ? 0 : Number(entryDisp.innerText);
    }
}

document.querySelectorAll(".num").forEach(num => {
    num.addEventListener("click", () => AddDigit(num.innerText));
});

document.querySelector("#c").addEventListener("click", Clear);
document.querySelector("#ce").addEventListener("click", CancelEntry);
document.querySelector("#del").addEventListener("click", Delete);

document.querySelector("#decimal").addEventListener("click", AddPointToEntry);
document.querySelector("#plus-minus").addEventListener("click", () => {
    entry *= -1;
    entryDisp.innerText = entry;
});

document.querySelector("#oper-div").addEventListener("click", () => AddOperator("/"));
document.querySelector("#oper-mul").addEventListener("click", () => AddOperator("*"));
document.querySelector("#oper-sub").addEventListener("click", () => AddOperator("-"));
document.querySelector("#oper-sum").addEventListener("click", () => AddOperator("+"));
document.querySelector("#oper-eq").addEventListener("click", Calculate);