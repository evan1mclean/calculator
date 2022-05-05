//Global variables
let currentDigit;
let displayValue;
let currentOperator;
let operatorClicked = false;
let display = document.querySelector('.displayValue');

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
    numbers.forEach(button => {
        button.addEventListener('click', function(e) {
            getNumberFromButton(e);
            displayNumber(currentDigit);
        });
    });
    operators.forEach(button => {
        button.addEventListener('click', function(e) {
            getOperator(e);
            displayOperation(displayValue);
        });
    });
    /* equals.addEventListener('click', equalsButton()); */
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
        operatorClicked = false;
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
}

//gets current operator from button clicked and stores the current display value
function getOperator(e) {
    operatorClicked = true;
    displayValue = parseFloat(display.textContent);
    currentOperator = e.target.getAttribute('id');
}

function displayOperation(displayValue) {
    let currentOperation = document.querySelector('.currentOperation');
    switch (currentOperator) {
        case "add":
            currentOperation.textContent = `${displayValue} + `;
            break;
        case "subtract":
            currentOperation.textContent = `${displayValue} - `;
            break;
        case "multiply":
            currentOperation.textContent = `${displayValue} x `;
            break;
        case "divide":
            currentOperation.textContent = `${displayValue} / `;
            break;
    }
}

/* function equalsButton(displayValue) {
    let num1 = displayValue;
    display.textContent = "";
    let num2 = parseFloat(display.textContent);
    if (num2 === "")
    
} */

setButtonListeners();