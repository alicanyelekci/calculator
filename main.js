const btnNumber = document.querySelectorAll("[data-number]");
const btnOperator = document.querySelectorAll("[data-operation]");
const btnEquals = document.getElementById("equals");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const currentDisplay = document.getElementById("current-display");
const upperDisplay = document.getElementById("upper-display");

let displayedNumber = currentDisplay.innerText;
let firstNumber = "";
let secondNumber = "";
let operator = "";
updateDisplay("0");

window.addEventListener('keydown', keyboardInput);
btnDelete.addEventListener("click", () => deleteNumber());
btnEquals.addEventListener("click", () => evaluate());
btnClear.addEventListener("click", () => clear());

btnNumber.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.innerText));
});

btnOperator.forEach(button => {
    button.addEventListener("click", () => operation(button.innerText));
});


function evaluate() {
    if(displayedNumber === "") {
        operator = "";
        updateUpperDisplay(operator, firstNumber);
        return;
    }
    secondNumber = displayedNumber;
    operate(firstNumber, secondNumber, operator);
    operator = "";
    updateUpperDisplay(operator);
    displayedNumber = "";
    updateDisplay(displayedNumber);
}

function clear() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    displayedNumber = "";
    upperDisplay.innerText = "";
    updateDisplay("0");
}

function operation(button) {
    if(operator !== "") evaluate();
    if(displayedNumber == ".") return;
    getFirstNumber();
    if(firstNumber == "") return;
    displayedNumber = firstNumber;
    operator = button;//button.innerText;
    updateUpperDisplay(operator);
    clearDisplay();
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'c' || e.key === 'C') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') operation(e.key);
};

function updateUpperDisplay(operator, number = displayedNumber) {
    upperDisplay.innerText = `${number} ${operator}`;
}

function getFirstNumber() {
    if(displayedNumber == "") {
        firstNumber = upperDisplay.innerText; 
    }
    else {
        firstNumber = displayedNumber;
    }
};

function appendNumber(number) {
    if(displayedNumber.length > 15) return;
    if(displayedNumber.indexOf(".") > -1 && number == ".") {
        return;
    }
    else {
        displayedNumber += number;
        updateDisplay(displayedNumber);    
    }
};

function deleteNumber() {
    let number = displayedNumber.split("");
    number.pop();
    displayedNumber = number.join("");
    updateDisplay(displayedNumber);
    if (displayedNumber.length === 0) updateDisplay("0");
}

function clearDisplay() {
    displayedNumber = "";
    updateDisplay(displayedNumber);
};

function updateDisplay(number) {
    currentDisplay.innerText = number;
};

function operate(num1, num2, operator) {
    if(operator == "") return;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    if(operator == "+"){   
        displayedNumber = num1 + num2;
    }
    else if(operator == "-"){
        displayedNumber = num1 - num2;
    }
    else if(operator == "*"){
        displayedNumber = num1 * num2;
    }
    else if(operator == "/"){
        displayedNumber = num1 /num2;
    }

    displayedNumber = parseFloat(displayedNumber).toFixed(1);
    firstNumber = displayedNumber;
    updateDisplay(displayedNumber);
};