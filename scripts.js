//Global variables
let currentDigit;
let displayValue;
let currentOperator;
let display = document.querySelector('.displayValue');

//Next four functions do basic math and return values
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
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
    numbers.forEach(button => {
        button.addEventListener('click', function(e) {
            getNumberFromButton(e);
            displayNumber(currentDigit);
        });
    });
    operators.forEach(button => {
        button.addEventListener('click', function(e) {
            getOperator(e);
        });
    });
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
    //checks to make sure there's only 1 decimal point in the number
    if (display.textContent.includes('.') && number === ".") {
        return;
    }
    //beyond 14 digits the screen starts to get stretched out
    else if (display.textContent.length === 14) {
        alert("You have reached the calculator's display limit!");
        return;
    }
    else {
        display.textContent += number;
    }
}

//gets current operator from button clicked and stores the current display value
function getOperator(e) {
    displayValue = parseFloat(display.textContent);
    currentOperator = e.target.getAttribute('id');
}

setButtonListeners();