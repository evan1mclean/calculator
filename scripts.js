//Global variable to store current number clicked
let currentNumber;

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

function setButtonListeners() {
    let numbers = document.querySelectorAll('.number');
    numbers.forEach(button => {
        button.addEventListener('click', function(e) {
            getNumberFromButton(e);
            displayNumber(currentNumber);
        });
    })
}

//gets number from button clicked and returns the value
function getNumberFromButton(e) {
    currentNumber = e.target.textContent;
    //checks for if decimal point was clicked
    if (isNaN(currentNumber)) {
        return currentNumber = ".";
    }
    return currentNumber;
}

//displays number on the screen
function displayNumber(number) {
    display = document.querySelector('.currentOperation');
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

setButtonListeners();