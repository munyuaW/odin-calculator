const log = console.log.bind(document);
log("Start simple, finish something!");

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator");

const clearBtn = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const equalsBtn = document.querySelector(".equals");

const deleteBtn = document.querySelector(".delete");

// The calculator state variables
let currentValue = "0";
let previousValue = null;
let operator = null;
let isNewNumber = false;

// init the calculator display
updateDisplay(currentValue);

// The calculation function: No DOM acess, no side effects
function operate(op, a, b) {
  let num1 = Number(a);
  let num2 = Number(b);

  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return b;
  }
}

// Operations
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
// TODO: what should happen after ERR!
function divide(a, b) {
  if (b === 0) return "ERR!";
  return a / b;
}

// helper functions
function readNumber(num) {
  if (!isNewNumber) {
    currentValue = currentValue === "0" ? num : currentValue + num;
  } else {
    currentValue = num;
    isNewNumber = false;
  }

  return currentValue;
}

function readOperator(newOperator) {
  if (operator && !isNewNumber) {
    let result = operate(operator, previousValue, currentValue);
    previousValue = result;
    updateDisplay(result);
  } else {
    previousValue = currentValue;
  }

  operator = newOperator;
  isNewNumber = true;
}

function addDecimal(period) {
  if (isNewNumber) {
    currentValue = "0.";
    isNewNumber = false;
  } else if (!currentValue.includes(period)) {
    currentValue += period;
  }

  updateDisplay(currentValue);
}

function equals() {
  if (!operator || isNewNumber) return;

  let result = operate(operator, previousValue, currentValue);
  updateDisplay(result);

  previousValue = result;
  currentValue = result; // At all times, currentValue reflects what the display is showing

  operator = null;

  isNewNumber = true;
}

function undo() {
  let lastIndex = currentValue.length - 1;
  currentValue = currentValue.slice(0, lastIndex);
  if (currentValue.length === 0) currentValue = "0";

  updateDisplay(currentValue);
}

function updateDisplay(value) {
  display.textContent = value;
}

function clearAndReset() {
  // reset everything
  currentValue = "0";
  previousValue = null;
  operator = null;
  isNewNumber = false;

  updateDisplay(currentValue);
}

// Event listeners
numberBtns.forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = readNumber(e.target.textContent);

    updateDisplay(value);
  }),
);

operatorBtns.forEach((button) =>
  button.addEventListener("click", (e) => {
    let op = e.target.textContent;
    readOperator(op);
  }),
);

decimal.addEventListener("click", (e) => {
  const dec = e.target.textContent;
  addDecimal(dec);
});

equalsBtn.addEventListener("click", equals);

clearBtn.addEventListener("click", clearAndReset);

deleteBtn.addEventListener("click", undo);
