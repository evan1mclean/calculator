//Global variables
let currentDigit;
let clearDisplay = false;
let operatorClickedAgain = 0;
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

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function squareRoot(num1) {
    return Math.sqrt(num1);
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
        case "power":
            result = power(num1, num2);
            break;
        case "square-root":
            result = squareRoot(num1);
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
    window.addEventListener('keydown', getKeyboardInputs);
    numbers.forEach(button => {
        button.addEventListener('click', function(e) {
            getNumberFromButton(e);
            displayNumber(currentDigit);
        });
    });
    operators.forEach(button => {
        button.addEventListener('click', operatorEventLoop);
    });
    equals.addEventListener('click', function() { 
        getNumbersForCalculation();
        equalsButton();
    });
    clear.addEventListener('click', function() {
        clearButton();
    })
    backspace.addEventListener('click', function() {
        backspaceButton();
    })
}

//function for getting keyboard inputs and implementing the correct logic
function getKeyboardInputs(e) {
    //Allows you to populate display by typing numbers
    if (e.key === "0" || Number(e.key) || e.key === ".") {
        currentDigit = e.key;
        displayNumber(currentDigit);
    }
    else if (e.key === "Enter") {
        getNumbersForCalculation();
        equalsButton();
    }
    else if (e.key === "Backspace") {
        backspaceButton();
    }
    else if (e.key === "c") {
        clearButton();
    }
    else if (e.key === "+" || e.key === "-" || e.key === "/"|| e.key === "*" || e.key === "^" || e.key === "√") {
        operatorEventLoop(e);
    }
    else {
        return;
    }
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
    if (clearDisplay) {
        display.textContent = "";
        //properly displays decimal if decimal is clicked after operator
        if (number === "." && display.textContent === "") {
            display.textContent = "0.";
        }
        else {
            display.textContent += number;
        }
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
    clearDisplay = false;
}

//gets current operator from button clicked or key pressed and stores the current display value
function getOperator(e) {
    operation.operator = e.target.getAttribute('id');
    switch (e.key) {
        case "+":
            operation.operator = "add";
            break;
        case "-":
            operation.operator = "subtract";
            break;
        case "/":
            operation.operator = "divide";
            break;
        case "*":
            operation.operator = "multiply";
            break;
        case "^":
            operation.operator = "power";
            break;
        case "√":
            operation.operator = "square-root";
            break;
    }
}

//Sets the values for num1 and num2
function getNumbersForCalculation() {
    if (operation.num1 === "") {
        operation.num1 = parseFloat(display.textContent);
    }
    else {
        operation.num2 = parseFloat(display.textContent);
    }
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
        case "power":
            currentOperation.textContent = `${operation.num1} ^ `;
            break;
        case "square-root":
            currentOperation.textContent = `SQRT(${operation.num1})`;
            break;
    }
}

//function to handle the logic implemented when an operator button is clicked or pressed
function operatorEventLoop(e) {
    operatorClickedAgain++;
    getNumbersForCalculation();
    //if operator is clicked more than once, operate on the numbers first
    let result = operate(operation.operator,operation.num1, operation.num2);
    if (operatorClickedAgain > 1) {
        cleanResult(result);
        operation.num1 = "";
        operatorClickedAgain = 1;
    }
    clearDisplay = true;
    getOperator(e);
    getNumbersForCalculation();
    displayOperation();
}

//function to make the equals button work
function equalsButton() {
    //allows the ability to repopulate the display correctly after clicking the equals button
    clearDisplay = true;
    currentOperation.textContent = "";
    displayOperation();
    let result = operate(operation.operator,operation.num1, operation.num2);
    //if equals button is clicked before an operator has, do nothing
    if (typeof result == 'undefined') {
        return;
    }
    //Displays slightly differently for square root
    if (operation.operator != "square-root") {
        currentOperation.textContent += `${operation.num2} =`;
    }
    cleanResult(result);
    operation.num1 = "";
    operatorClickedAgain = 0
}

//Takes the result and cleans the value so it fits on the display properly
function cleanResult(result) {
    //Rounds decimals to 7 digits
    if (result.toString().includes('.') && result.toString().length >= 10) {
        let largeNumberwithDecimal = result.toString().split(".");
        //rounds down even more if first half of the number is too large for screen
        if (largeNumberwithDecimal[0].length >=3) {
            display.textContent = result.toFixed(3);
            operation.num1 = result.toFixed(3);
        }
        else {
            display.textContent = result.toFixed(7);
            operation.num1 = result.toFixed(7);
        }
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
    }
}

//function that clears all values and sets the screen back to zero
function clearButton() {
    display.textContent = "0";
    currentOperation.textContent = "";
    operation.num1 = "";
    operation.num2 = "";
    operation.operator = "";
    operatorClickedAgain = 0;
}

function backspaceButton() {
    if (display.textContent === "0") {
        return;
    }
    else if (display.textContent.length === 1) {
        display.textContent = "0";
    }
    else {
        let newDisplay = display.textContent.slice(0,-1);
        display.textContent = newDisplay;
        getNumbersForCalculation();
    }
}

setButtonListeners();