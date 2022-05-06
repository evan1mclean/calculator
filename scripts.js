//Global variables
let currentDigit;
let operatorClicked = false;
let operation = {
    num1: "",
    operator: "",
    num2: "",
}
let display = document.querySelector('.displayValue');
let currentOperation = document.querySelector('.currentOperation');

//Next four functions do basic math and return values
//multiply and divide by 10 to deal with floating point precision
function add(num1, num2) {
    return (num1 * 10 + num2 * 10)/10;
}

function subtract(num1, num2) {
    return (num1 * 10 - num2 * 10)/10;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1/num2;
}

//Determines which operator is used and calls the appropriate math function
function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case "add":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
    }
    return result;
}

//Sets event listeners for each of the buttons
function setButtonListeners() {
    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');
    let equals = document.querySelector('#equals');
    let clear = document.querySelector('#clear');
    let backspace = document.querySelector('#backspace');
    numbers.forEach(button => {
        button.addEventListener('click', function(e) {
            getNumberFromButton(e);
            displayNumber(currentDigit);
        });
    });
    operators.forEach(button => {
        button.addEventListener('click', function(e) {
            getOperator(e);
            displayOperation();
        });
    });
    equals.addEventListener('click', function() { 
        equalsButton();
    });
    clear.addEventListener('click', function() {
        clearButton();
    })
    backspace.addEventListener('click', function() {
        backspaceButton();
    })
}

//gets number from button clicked and returns the value
function getNumberFromButton(e) {
    currentDigit = e.target.textContent;
    //checks for if decimal point was clicked
    if (isNaN(currentDigit)) {
        return currentDigit = ".";
    }
    return currentDigit;
}

//displays number on the screen
function displayNumber(number) {
    if (operatorClicked) {
        display.textContent = "";
        //properly displays decimal if decimal is clicked after operator
        if (number === "." && display.textContent === "") {
            display.textContent = "0.";
        }
        else {
            display.textContent += number;
        }
        operation.num2 = parseFloat(display.textContent);
    }
    //checks to make sure you can't just append a bunch of zeros
    else if (display.textContent === "0" && number === "0") {
        return;
    }
    //checks to make sure there's only 1 decimal point in the number
    else if (display.textContent.includes('.') && number === ".") {
        return;
    }
    //beyond 14 digits the screen starts to get stretched out
    else if (display.textContent.length === 14) {
        alert("You have reached the calculator's display limit!");
        return;
    }
    //removes initial zero unless a decmial point is used
    else if (display.textContent === "0" && number != ".") {
        display.textContent = number;
    }
    else {
        display.textContent += number;
    }
    operatorClicked = false;
}

//gets current operator from button clicked and stores the current display value
function getOperator(e) {
    operatorClicked = true;
    operation.num1 = parseFloat(display.textContent);
    operation.operator = e.target.getAttribute('id');
}

//function to display the current operation on the upper part of the display screen
function displayOperation() {
    switch (operation.operator) {
        case "add":
            currentOperation.textContent = `${operation.num1} + `;
            break;
        case "subtract":
            currentOperation.textContent = `${operation.num1} - `;
            break;
        case "multiply":
            currentOperation.textContent = `${operation.num1} x `;
            break;
        case "divide":
            currentOperation.textContent = `${operation.num1} / `;
            break;
    }
}

//function to make the equals button work
function equalsButton() {
    //allows the ability to repopulate the display correctly after clicking the equals button
    operatorClicked = true;
    currentOperation.textContent = "";
    displayOperation();
    currentOperation.textContent += `${operation.num2}`;
    //if no num2 value is set, default to using num1 for both numbers
    if (operation.num2 === "") {
        operation.num2 = operation.num1;
    }
    let result = operate(operation.operator,operation.num1, operation.num2);
    //if equals button is clicked before an operator has, do nothing
    if (typeof result == 'undefined') {
        return;
    }
    //Rounds decimals to 7 digits
    else if (result.toString().includes('.') && result.toString().length >= 10) {
        display.textContent = result.toFixed(7);
        operation.num1 = result.toFixed(7);
    }
    //Displays large numbers in scientific notation
    else if (result.toString().length >= 10) {
        display.textContent = result.toPrecision(5);
        operation.num1 = result.toPrecision(5);
    }
    //Stops dividing by zero
    else if (operation.operator === 'divide' && operation.num2 === 0) {
        currentOperation.textContent = "Try a different divisor please";
        alert("Please don't try dividing by zero again. It's just not goning to happen...");
    }
    else {
        display.textContent = result;
        operation.num1 = result;
    }
}

function clearButton() {
    display.textContent = "0";
    currentOperation.textContent = "";
    operation.num1 = "";
    operation.num2 = "";
    operation.operator = "";
}

function backspaceButton() {
    if (display.textContent === "0") {
        return;
    }
    else {
        let newDisplay = display.textContent.slice(0,-1);
        display.textContent = newDisplay;
        operation.num1 = parseFloat(newDisplay);
    }
}

setButtonListeners();