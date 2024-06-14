// Calculator Project

// Variable to store the result display element
const result = document.querySelector(".result");

// Variable to store the equal button element
const equal = document.querySelector(".btn-equal");

// Calculator object
const calculator = {
  // Array to store inputs: exp[0] for the first operand, exp[1] for the operator, and exp[2] for the second operand
  exp: ["", "", ""],

  // Method to perform addition
  add: (a, b) => {
    return a + b;
  },

  // Method to perform subtraction
  sub: (a, b) => {
    return a - b;
  },

  // Method to perform multiplication
  mul: (a, b) => {
    return a * b;
  },

  // Method to perform division
  div: (a, b) => {
    return b !== 0 ? a / b : (result.textContent = "error");
  },

  // Method to reset the calculator
  reset: () => {
    result.textContent = "";
    calculator.exp = ["", "", ""];
  },
};

// Variable to store the clear button element
const clear = document.getElementById("clear");
clear.addEventListener("click", calculator.reset);

// Variable to store all number buttons
const numbers = document.querySelectorAll(".btn-number");
numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (result.textContent === "error") {
      calculator.reset();
    }
    result.textContent += btn.textContent;

    // Update the appropriate operand in the calculator object's exp array
    calculator.exp[1] === ""
      ? (calculator.exp[0] += btn.textContent)
      : (calculator.exp[2] += btn.textContent);

    enableButtons();
  });
});

// Variable to store all operator buttons
const operators = document.querySelectorAll(".btn-op");
operators.forEach((opr) => {
  opr.addEventListener("click", () => {
    expression2(calculator.exp[0], calculator.exp[1], calculator.exp[2]);
    calculator.exp[1] = opr.textContent;

    // Display the operator sign in the result
    result.textContent += opr.textContent;

    disableButtons();
  });
});

// Event listener for the equal button
equal.addEventListener("click", () => {
  expression2(calculator.exp[0], calculator.exp[1], calculator.exp[2]);
});

// Function to disable operator buttons and equal button
function disableButtons() {
  operators.forEach((op) => (op.disabled = true));
  document.querySelector(".btn-equal").disabled = true;
}

// Function to enable operator buttons and equal button
function enableButtons() {
  operators.forEach((op) => (op.disabled = false));
  document.querySelector(".btn-equal").disabled = false;
}

// Function to evaluate the expression and update the result
function expression2(a, operator, b) {
  if (b !== "") {
    switch (operator) {
      case "+":
        a = calculator.add(parseInt(a), parseInt(b));
        break;
      case "-":
        a = calculator.sub(parseInt(a), parseInt(b));
        break;
      case "*":
        a = calculator.mul(parseInt(a), parseInt(b));
        break;
      case "/":
        a = calculator.div(parseInt(a), parseInt(b));
        break;
    }
    result.textContent = a;
    calculator.exp = [a.toString(), "", ""];
  } else {
    result.textContent = a + " " + operator;
  }
}
