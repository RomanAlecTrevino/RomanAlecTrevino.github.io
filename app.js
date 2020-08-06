// Create calculator object
const calculator = {
    displayValue: 0,
    firstOperand: null,
    waitForNextOperand: false,
    operator: null, 
}

function inputNumber(num) {
    const { displayValue, waitForNextOperand } = calculator;
    // If the current displayValue is 0, overwrite. Otherwise append
    calculator.displayValue = displayValue === 0 ? num : displayValue + num;

    // Track next operand
    if(waitForNextOperand) {
        calculator.displayValue = num;
        calculator.waitForNextOperand = false;
    } else {
        calculator.displayValue = displayValue === 0 ? num : displayValue + num;
    }
}

const updateDisplay = () => {
    // Set input screen equal to calculator.displayValue
    const inputScreen = document.querySelector('.input-screen');
    inputScreen.value = calculator.displayValue;
}

function inputDecimal(decimal) {
    if(!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
}

function handleOperator(nextOperand) {
    // Destructor calculator object
    const { firstOperand, displayValue, operator } = calculator;

    // Make value of displayValue a float
    const inputValue = parseFloat(displayValue);

    // Create override if client changes mind about input
    if(operator && calculator.waitForNextOperand) {
        calculator.operator = nextOperand;
        return;
    }

    // Make sure that there is no first operand and that inputValue is a number
    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if(operator) {
        const result = calculate(firstOperand, inputValue, operator)

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        updateDisplay();
    }

    // Change the waiting for next operand status to true and set the operator equal to argument
    calculator.waitForNextOperand = true;
    calculator.operator = nextOperand;
}

function calculate(firstOperand, secondOperand, operator) {
    // Add calculate functions depending on the operator
    switch(operator) {
        case '+':
            return firstOperand + secondOperand;
            break;
        case '-':
            return firstOperand - secondOperand;
            break;
        case '/':
            return firstOperand / secondOperand;
            break;
        case '*':
            return firstOperand * secondOperand;
            break;
        case '%':
            return firstOperand % secondOperand;
            break;
    }
    // If none of the above, it is equals. Then only the secondOperand will be returned.
    return secondOperand;
}

function clearAll() {
    calculator.displayValue = 0;
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitForNextOperand = false;
}

// Set up event listeners for keys
const keys = document.querySelector('.keys');

keys.addEventListener('click', event => {
    // Below is the same as const target = target.event -- using deconstructors
    const { target } = event;
    // Guard Clause
    if(!target.matches('button')) return;
    
    // Is it a number? 
    if(target.classList.contains('num')) {
        inputNumber(target.value);
        updateDisplay();
    }

    // Is it an operator?
    if(target.classList.contains('operator')) {
        handleOperator(target.value);
    }

    // Is it a decimal?
    if(target.classList.contains('decimal')) {
        inputDecimal(target.value);
    }

    // Clearing?
    if(target.classList.contains('clear-all')) {
        clearAll();
        updateDisplay();
    }
})