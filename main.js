// Variable to store the result display element
const result = document.querySelector(".result");

// Variable to store the equal button element
const equal = document.querySelector(".btn-equal");

// Flag to track if a result has been displayed
let resultDisplayed = false;

// Calculator object to store the expression and perform calculations
const calculator = {
  // Array to store inputs: [operand1, operator, operand2]
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
    resultDisplayed = false;
    enableButtons("fraction");
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
    if (resultDisplayed) {
      result.textContent = "";
      calculator.exp = ["", "", ""];
      resultDisplayed = false;
      enableButtons("fraction");
    }

    // Update the appropriate operand in the calculator object's expression array
    calculator.exp[1] === ""
      ? (calculator.exp[0] += btn.textContent)
      : (calculator.exp[2] += btn.textContent);

    // Update the result display
    result.textContent += btn.textContent;
    enableButtons("");
  });
});

// Variable to store all operator buttons
const operators = document.querySelectorAll(".btn-op");
operators.forEach((opr) => {
  opr.addEventListener("click", () => {
    disableButtons("");
    enableButtons("fraction");

    // Evaluate the expression so far and update the result display
    expression2(calculator.exp[0], calculator.exp[1], calculator.exp[2]);

    // Update the operator in the calculator object's expression array
    calculator.exp[1] = opr.textContent;

    // Update the result display
    result.textContent += opr.textContent;
  });
});

// Event listener for the equal button
equal.addEventListener("click", () => {
  // Evaluate the complete expression and update the result display
  expression2(calculator.exp[0], calculator.exp[1], calculator.exp[2]);
  resultDisplayed = true;
});

// Variable to store the fraction button element
let btnFraction = document.querySelector('[data-id="fraction"]');
btnFraction.addEventListener("click", addFraction);

// Function to handle the fraction button click
function addFraction() {
  // Update the result display and the appropriate operand in the calculator object's expression array
  result.textContent += ".";
  calculator.exp[1] === ""
    ? (calculator.exp[0] += ".")
    : (calculator.exp[2] += ".");
  disableButtons("fraction");
}

// Variable to store the delete button element
let btnDelete = document.querySelector('[data-id="delete"]');
btnDelete.addEventListener("click", () => {
  // Remove the last character from the result display and the appropriate operand in the calculator object's expression array
  result.textContent = deleteNum(result.textContent);
  if (calculator.exp[1] === "") {
    calculator.exp[0] = deleteNum(calculator.exp[0]);
    if (!calculator.exp[0].includes(".")) enableButtons("fraction");
    } else {
    calculator.exp[2] = deleteNum(calculator.exp[2]);
    if (!calculator.exp[2].includes(".")) enableButtons("fraction");
  }
});

// Function to delete the last character in a string
function deleteNum(ele) {
  return ele.substring(0, ele.length - 1);
}

// Function to disable operator buttons and equal button
function disableButtons(type) {
  if (type === "fraction") {
    document.querySelector('[data-id="fraction"]').disabled = true;
  } else {
    operators.forEach((op) => (op.disabled = true));
    document.querySelector(".btn-equal").disabled = true;
  }
}

// Function to enable operator buttons and equal button
function enableButtons(type) {
  if (type === "fraction") {
    document.querySelector('[data-id="fraction"]').disabled = false;
  } else {
    operators.forEach((op) => (op.disabled = false));
    document.querySelector(".btn-equal").disabled = false;
  }
}

// Function to evaluate the expression and update the result
function expression2(a, operator, b) {
  if (b !== "") {
    // Convert operands to appropriate number types
    if (a.includes(".") || b.includes(".")) {
      a = stringToFloat(a);
      b = stringToFloat(b);
    } else {
      a = parseInt(a);
      b = parseInt(b);
    }

    // Perform the calculation based on the operator
    switch (operator) {
      case "+":
        a = calculator.add(a, b);
        break;
      case "-":
        a = calculator.sub(a, b);
        break;
      case "*":
        a = calculator.mul(a, b);
        break;
      case "/":
        a = calculator.div(a, b);
        break;
    }

    // Convert the result back to a string and update the result display
    a = a.toString();
    if (a.length >= 11) {
      let s = "";
      for (let index = 0; index < 11; index++) {
        s += a[index];
      }
      a = parseFloat(s).toFixed(2);
    }
    result.textContent = a;

    // Update the calculator object's expression with the new result as the first operand
    calculator.exp = [a.toString(), "", ""];
    resultDisplayed = true;
  } else {
    result.textContent = a + " " + operator;
  }
}

// Function to convert a string representation of a fraction to a floating-point number
function stringToFloat(str) {
  let fraction = 1;

  while (str.toString().includes(".")) {
    str = str * 10;
    fraction /= 10;
  }
  return str * fraction;
}
