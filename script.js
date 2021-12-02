const buttons = document.querySelectorAll(".calc-button");
const display = document.querySelector(".calc-display");
let displayValue = "";
let num1 = "";
let num2 = "";
let operator = "";
let resetNum1 = true;

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

function operate() {
    switch (operator) {
        case '+':
            num1 = String(add(parseFloat(num1), parseFloat(num2)));
            break;
        case '-':
            num1 = String(subtract(parseFloat(num1), parseFloat(num2)));
            break;
        case '*':
            num1 = String(multiply(parseFloat(num1), parseFloat(num2)));
            break;
        case '/':
            num1 = String(divide(parseFloat(num1), parseFloat(num2)));
            break;
        default:
            num1 = "ERROR";
            break;
    }
    num2 = "";
    operator = "";
}

function formatNumberDisplay(x) {
    if (x === "") {
        return x;
    }
    // Round to 3 decimal places
    x = Math.round(x*100)/100;
    // Convert to scientific notation
    if (x >= 1000000) {
        x = x.toExponential(2);
    }
    return x;
}

function updateDisplay() {
    let numDisplay1 = formatNumberDisplay(num1);
    let numDisplay2 = formatNumberDisplay(num2);
    display.textContent = `${numDisplay1} ${operator} ${numDisplay2}`;
    if (display.textContent === "  ") {
        display.textContent = '\xa0';
    }
}

function isOperator(x) {
    return (x==="+" || x==="-" || x==="*" || x==="/");
}

function isNumber(x) {
    return (x==="1" || x==="2" || x==="3" || x==="3" ||
            x==="4" || x==="5" || x==="6" || x==="7" ||
            x==="8" || x==="9" || x==="0");
}

function isDeleteKey(x) {
    return x === "DELETE" || x === "Backspace" || x === "Delete";
}

function isEqualKey(x) {
    return x === "=" || x === "Enter";
}

function isValidKey(x) {
    return (isNumber(x) || isOperator(x) || 
            isDeleteKey(x) || isEqualKey(x) || x === ".");
}

function updateValues(x) {
    if (isOperator(x)) {
        if (num2 != "") {
            operate();
            operator = x;
        } else if (num1 != "") {
            operator = x;
        }
    } else if (isNumber(x)) {
        if (operator === "") {
            if (resetNum1) {
                num1 = x;
                resetNum1 = false;
            } else {
                num1 += x;
            }
        } else {
            num2 += x;
        }
    } else if (x === ".") {
        if (operator === "") {
            if (resetNum1) {
                num1 = "0";
                resetNum1 = false;
            }
            if (num1.includes(".")) return;
            if (num1 == "") {
                num1 = "0";
                resetNum1 = false;
            }
            num1 += x;
        } else {
            if (num2.includes(".")) return;
            if (num2 == "") {
                num2 = "0";
            }
            num2 += x;
        }
    } else if (x === "CLEAR") {
        num1 = "";
        num2 = ""; 
        operator = "";
    } else if (isDeleteKey(x)) {
        if (operator === "") {
            num1 = num1.slice(0, num1.length - 1);
        } else if (num2 === "") {
            operator = "";
        } else {
            num2 = num2.slice(0, num2.length - 1);
        }
    } else if (isEqualKey(x) && num2 != "") {
        operate();
        resetNum1 = true;
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(){
        updateValues(buttons[i].textContent);
        updateDisplay();
    });
    buttons[i].addEventListener('keypress', function (e) {
        if (e.key === buttons[i].textContent) {
            updateValues(buttons[i].textContent);
            updateDisplay();
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (isValidKey(e.key)) {
        updateValues(e.key);
        updateDisplay();
    }
});