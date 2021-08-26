const number_display = document.getElementById("current_number");
const equation_display = document.getElementById("equation");
let current_number = "0";
let numbers = [];
let operators = [];
let memory_number = 0;

let button_last_pressed = "none";

//Return a function for each type of number pressed
const handleNumberPressed = num => () => {
  console.log(button_last_pressed);
  if (
    current_number === "0" ||
    (button_last_pressed != "number" && button_last_pressed != "dot")
  ) {
    //Start new number after equals was used
    //Start new number if current number is 0 and 0 is not pressed
    if (num !== "0" || button_last_pressed != "number") {
      current_number = num;
    }
  } else {
    current_number += num;
  }

  //Update view
  number_display.innerHTML = current_number;
  console.log(current_number);
  button_last_pressed = "number";
};

const handlePiPressed = () => {
  current_number = Math.PI;
  number_display.innerHTML = current_number;

  button_last_pressed = "pi";
};

//Add dot after current number if no dot has been added yet
const handleDotPressed = () => {
  if (current_number.indexOf(".") == "-1") {
    current_number += ".";
  }

  //Update view
  number_display.innerHTML = current_number;
  button_last_pressed = "dot";
};

//Return function for each type of operator used
const handleOperatorPressed = op => () => {
  if (button_last_pressed != "operator") {
    numbers.push(parseFloat(current_number));
    operators.push(op);
  } else {
    operators.pop();
    operators.push(op);
  }
  //Calculate current answer if more than one operator is used
  let current_answer = numbers.length > 1 ? calculate() : current_number;

  //Reset current number and update view
  current_number = "0";
  number_display.innerHTML = current_answer;
  button_last_pressed = "operator";
};

const handleEqualsPressed = () => {
  //add last number entered and calculate result
  numbers.push(parseInt(current_number));
  current_number = calculate();
  number_display.innerHTML = current_number;

  //clear calculation list
  numbers = [];
  operators = [];
  button_last_pressed = "equals";
};

//Clear calculator and all calculations
const handleCPressed = () => {
  current_number = "0";
  numbers = [];
  operators = [];
  number_display.innerHTML = current_number;
  button_last_pressed = "c";
};

//Clear Current number being entered
const handleCePressed = () => {
  current_number = "0";
  number_display.innerHTML = current_number;
  button_last_pressed = "ce";
};

const handleMemoryRecallPressed = () => {
  current_number = memory_number;
  number_display.innerHTML = current_number;
  button_last_pressed = "mrc";
};

const handleMemoryAddPressed = () => {
  memory_number += parseFloat(current_number);
  button_last_pressed = "m+";
};

const handleMemorySubtractPressed = () => {
  memory_number -= parseFloat(current_number);
  button_last_pressed = "m-";
};

const calculate = () => {
  let current_operators = [...operators];
  let current_numbers = [...numbers];

  console.log(current_numbers);
  console.log(current_operators);

  //Calculations for multiplication and division
  let index = 0;
  while (index < current_numbers.length - 1) {
    if (
      current_numbers.length > 1 &&
      (current_operators[index] == "multiply" ||
        current_operators[index] == "divide")
    ) {
      let partial_answer;

      if (current_operators[index] == "multiply") {
        partial_answer = current_numbers[index] * current_numbers[index + 1];
      } else if (current_operators[index] == "divide") {
        let dividend = current_numbers[index];
        let divisor = current_numbers[index + 1];

        if (divisor === 0) {
          return "Error";
        }
        partial_answer = dividend / divisor;
      }
      current_numbers.splice(index, 2, partial_answer);
      current_operators.splice(index, 1);

      console.log(current_numbers);
      console.log(current_operators);
    } else {
      index++;
    }
  }

  //Calculations for addition and subtraction
  index = 0;
  while (index < current_numbers.length - 1) {
    if (
      current_numbers.length > 1 &&
      (current_operators[index] == "add" ||
        current_operators[index] == "subtract")
    ) {
      let partial_answer;
      if (current_operators[index] == "add") {
        partial_answer = current_numbers[index] + current_numbers[index + 1];
      } else if (current_operators[index] == "subtract") {
        partial_answer = current_numbers[index] - current_numbers[index + 1];
      }
      current_numbers.splice(index, 2, partial_answer);
      current_operators.splice(index, 1);
      console.log(current_numbers);
      console.log(current_operators);
    } else {
      index++;
    }
  }

  return current_numbers[0];
};

const handlePercentPressed = () => {
  let percent = current_number;
  let operator = operators.pop();
  let number;
  //Multiply or divide by percentage
  if (operator == "multiply" || operator == "divide") {
    number = percent / 100;
  } else if (operator == "add" || operator == "subtract") {
    number = (calculate() * percent) / 100;
  }

  numbers.push(number);
  operators.push(operator);

  number_display.innerHTML = number;
  button_last_pressed = "percent";
};

document
  .getElementById("1")
  .addEventListener("click", handleNumberPressed("1"));
document
  .getElementById("2")
  .addEventListener("click", handleNumberPressed("2"));
document
  .getElementById("3")
  .addEventListener("click", handleNumberPressed("3"));
document
  .getElementById("4")
  .addEventListener("click", handleNumberPressed("4"));
document
  .getElementById("5")
  .addEventListener("click", handleNumberPressed("5"));
document
  .getElementById("6")
  .addEventListener("click", handleNumberPressed("6"));
document
  .getElementById("7")
  .addEventListener("click", handleNumberPressed("7"));
document
  .getElementById("8")
  .addEventListener("click", handleNumberPressed("8"));
document
  .getElementById("9")
  .addEventListener("click", handleNumberPressed("9"));
document
  .getElementById("0")
  .addEventListener("click", handleNumberPressed("0"));
document.getElementById("dot").addEventListener("click", handleDotPressed);
document.getElementById("pi").addEventListener("click", handlePiPressed);

document
  .getElementById("percent")
  .addEventListener("click", handlePercentPressed);
document
  .getElementById("divide")
  .addEventListener("click", handleOperatorPressed("divide"));
document
  .getElementById("multiply")
  .addEventListener("click", handleOperatorPressed("multiply"));
document
  .getElementById("subtract")
  .addEventListener("click", handleOperatorPressed("subtract"));
document
  .getElementById("add")
  .addEventListener("click", handleOperatorPressed("add"));

document.getElementById("c").addEventListener("click", handleCPressed);
document.getElementById("ce").addEventListener("click", handleCePressed);
document
  .getElementById("mcr")
  .addEventListener("click", handleMemoryRecallPressed);
document.getElementById("m+").addEventListener("click", handleMemoryAddPressed);
document
  .getElementById("m-")
  .addEventListener("click", handleMemorySubtractPressed);

document
  .getElementById("equals")
  .addEventListener("click", handleEqualsPressed);
