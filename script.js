const buttons = document.querySelectorAll(".calc-button");
const display = document.querySelector(".calc-display");
let displayValue = "";

function add(a, b) {
    return a + b;	
};
  
function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;	
};
  
function divide(a, b) {
    return a / b;
};

function operate(a, b, op) {
    switch (op) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return "ERROR";
    }
}

function displayClick(x) {
    displayValue += x;
    display.textContent = displayValue;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(){
        displayClick(buttons[i].textContent);
    });
}