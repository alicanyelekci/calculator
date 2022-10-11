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

btnDelete.addEventListener("click", () => deleteNumber());

btnEquals.addEventListener("click", () => {
    secondNumber = displayedNumber,
    operate(firstNumber, secondNumber, operator),
    operator = "",
    updateUpperDisplay(operator),
    displayedNumber = "",
    updateDisplay(displayedNumber)
});

btnClear.addEventListener("click", () => {
    firstNumber = "",
    secondNumber = "",
    operator = "",
    displayedNumber = "",
    upperDisplay.innerText = "",
    updateDisplay(displayedNumber)
});

btnOperator.forEach(button => {
    button.addEventListener("click", () => {
        if(operator !== "") btnEquals.click();
        if(displayedNumber == ".") return;
        getFirstNumber();
        if(firstNumber == "") return;
        displayedNumber = firstNumber;
        operator = button.innerText;
        updateUpperDisplay(operator);
        clearDisplay();
    });
});

btnNumber.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.innerText));
});

function updateUpperDisplay(operator) {
    upperDisplay.innerText = `${displayedNumber} ${operator}`;
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