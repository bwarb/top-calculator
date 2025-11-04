function add(first, second) {
    return first + second;
};

function subtract(first, second) {
    return first - second;
};

function multiply(first, second) {
    return first * second;
};

function divide(first, second) {
    return first / second;
};

let firstNumber;
let secondNumber;
let operator;

function operate(operator, first, second) {
    if (operator === '+') {
        operator = add;
    }
    else if (operator === '-') {
        operator = subtract;
    }
    else if (operator === '*') {
        operator = multiply;
    }
    else {
        operator = divide;
    }
    return operator(first, second);
}

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

const numbers = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+', '-', '*', '/'];
let currentNumber = '';
let operatorFlag = false;
let result = 0;

for (let button of buttons) {
    button.addEventListener("click", () => {
        console.log(button.innerHTML);
        // test for if input is a number
        if (button.innerHTML in numbers) {
            currentNumber += button.innerHTML;
            display.innerHTML = `${currentNumber}`;
        }
        else if (operators.includes(button.innerHTML)) {
            if (operatorFlag === false) {
                firstNumber = parseInt(currentNumber);
                operator = button.innerHTML;
                operatorFlag = true;
                currentNumber = '';
            }
            else {
                secondNumber = parseInt(currentNumber);
                result = operate(operator, firstNumber, secondNumber);
                display.innerHTML = `${result.toFixed(6).replace(/[.]0+$/, "")}`;
                operator = button.innerHTML;
                currentNumber = '';
                firstNumber = result;
                secondNumber = null;
            }
        }
        else if (button.innerHTML === 'C') {
            currentNumber = '';
            firstNumber = null;
            secondNumber = null;
            display.innerHTML = `${currentNumber}`;
        }
        else if (button.innerHTML === '=') {
            secondNumber = parseInt(currentNumber);
            if (secondNumber === 0 && operator === '/') {
                display.innerHTML = 'impossible!';
            }
            else {
                result = operate(operator, firstNumber, secondNumber);
                display.innerHTML = `${result.toFixed(6).replace(/[.]0+$/, "")}`;
            };
            operatorFlag = false;
            firstNumber = null;
            secondNumber = null;
            currentNumber = '';
        }
    }
    );
}