const keyboardInputs = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',  '.'],
    operators: ['-', '+', '=', '/', '*', '%'],
}
let value1, value2, result, displayValue;
let operator = '';

const displayDiv1 = document.querySelector('.displayDiv1');
const displayDiv2 = document.querySelector('.displayDiv2');
displayDiv2.textContent = '0';


// Operations
const add = (a, b) => {result = a + b};
const subtract = (a, b) => {result = a - b};
const multiply = (a, b) => {result = a * b};
const divide = (a, b) => {result = a / b};
const percentage = (a, b) => {result = a / 100 * b};


// Receives value1, value2 and operator signal and make the operation
const operate = (n1, op, n2) => {
    switch(op){
        case '+':
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
            break;
        case '*':
            multiply(n1, n2);
            break;
        case '/':
            divide(n1, n2);
            break;
        case '%':
            percentage(n1, n2);
            break
    }
};


// Reset the calculator
const clear = () => {
    value1 = undefined;
    value2 = undefined;
    operator = '';
    result = undefined;
    displayValue = undefined;
    displayDiv2.textContent = '0';
    displayDiv1.textContent = '';
    displayDiv2.style.fontSize = '22px';
};


// Refresh the display with updated values
const displayRefresh = () => {
    if(operator !== '' && (value2 !== 0 && value2 !== undefined)) {
        displayDiv2.textContent = `${value1} ${operator} ${value2}`;
        return
    }
    if(operator !== '' && (value2 == 0 || value2 == undefined)) {
        displayDiv2.textContent = `${value1} ${operator} `;
        return
    }
    displayDiv2.textContent = `${value1}`;
};


// Check if theres already a dot "." on the value to prevent multiple dots
const dotChecker = (value) => {
    value = String(value);
    for(i = 0; i <= value.length; i++){
        if(value.charAt(i) == '.'){
            value = Number(value);
            return true
        }
    } 
    value = Number(value);
    return false
};


// All clear (AC) event handler
const btnAc = document.querySelector('.btn-ac');
btnAc.addEventListener('mouseup', e => {
    clear();
});
btnAc.addEventListener('touchend', e => {
    clear();
});


// Backspace event handler
const btnBackspace = document.querySelector('.btn-backspace');
btnBackspace.addEventListener('mouseup', e => {
    backspaceEventHandler();
});
btnBackspace.addEventListener('touchend', e => {
    backspaceEventHandler();
});
const backspaceEventHandler = () => {
    if(displayDiv2.textContent == '0'){
        clear();
        return;
    }
    if(String(value2) == ''){
        value2 = undefined;
        displayRefresh();
        return;
    }
    if((value2 !== 0 && value2 !== undefined && value2 !== '')){
        value2 = String(value2);
        value2 = value2.slice(0, -1);
        value2 = Number(value2);
        displayRefresh();
        return;
    }
    if(operator !== ''){
        operator = '';
        displayRefresh();
        return;
    }
    if(String(value1) == ''){
        value1 = undefined;
        displayRefresh();
        return;
    }
    if((value1 !== 0 && value1 !== undefined && value1 !== '')){
        value1 = String(value1);
        value1 = value1.slice(0, -1);
        value1 = Number(value1);
        displayRefresh();
        return;
    }
}


// Operation buttons event handler
const opBtns = document.querySelectorAll('.opBtn');
opBtns.forEach(button => button.addEventListener('mouseup', e =>{
    displayDiv2.style.fontSize = '22px';
    opEventHandler(button.value);
}));
opBtns.forEach(button => button.addEventListener('touchend', e =>{
    displayDiv2.style.fontSize = '22px';
    opEventHandler(button.value);
}));
const opEventHandler = (value) => {
    if(keyboardInputs.operators.indexOf(value) == -1) return;
    if((value1 !== 0 && value1 !== undefined && value1 !== '') && operator !== '' && (value2 !== 0 && value2 !== undefined && value2 !== '')){
        equalEventHandler(); 
    }
    if((displayValue !== undefined && displayValue !== '' && displayValue !== 0) && (value1 === undefined || value1 === '' || value1 === 0)){
        value1 = displayValue;
    }
    if(displayDiv2.textContent === 0 || displayDiv2.textContent === '0' || displayDiv2.textContent === `=  0`){
        value1 = 0;
    }
    operator = value;
    displayRefresh();
    return;
}


// Numeric buttons event handler
const btns = document.querySelectorAll('.numBtn');
btns.forEach(button => button.addEventListener('mouseup', e =>{
    displayDiv2.style.fontSize = '22px';
    numbersEventHandler(button.value);
}));
btns.forEach(button => button.addEventListener('touchend', e =>{
    displayDiv2.style.fontSize = '22px';
    numbersEventHandler(button.value);
}));
const numbersEventHandler = (value) => {
    if(keyboardInputs.numbers.indexOf(value) == -1) return;
    if(value == '.' && operator == '' && (value1 == 0 || value1 == undefined)){
        value1 = `0${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator == '' && (value1 !== 0 || value1 !== undefined)){
        if(dotChecker(value1) == true) {return};

        value1 = `${value1}${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator !== '' && (value2 == 0 || value2 == undefined)){
        value2 = `0${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator !== '' && (value2 !== 0 || value2 !== undefined)){
        if(dotChecker(value2) == true) {return};

        value2 = `${value2}${value}`;
        displayRefresh();
        return;
    }
    if(value1 === `${0.}`){
        value1 = Number(`${value1}${value}`);
        displayRefresh();
        return;
    }
    if((value1 === 0 || value1 === undefined) && operator === ''){
        value1 = value;
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator === ''){
        value1 = `${value1}${value}`;
        displayRefresh();
        return;
    }
    if(value2 === `${0.}`){
        value2 = Number(`${0.}${value}`);
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        if(value == 0){return};
        value2 = value;
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator !== '' && (value2 !== 0 && value2 !== undefined)){
        value2 = `${value2}${value}`;
        displayRefresh();
        return;
    } 
}


// Equal event handler
const btnEqual = document.querySelector('.btn-equal');
btnEqual.addEventListener('mouseup', e => equalEventHandler());
btnEqual.addEventListener('touchend', e => equalEventHandler())
const equalEventHandler = () => {  
    if((value1 !== 0 && value1 !== undefined) && (value2 !== 0 && value2 !== undefined) && operator !== ''){
        operate(Number(value1), operator, Number(value2));
        if(dotChecker(result) == true){
            result = Math.floor(result * 100) / 100;
            result = result.toFixed(2)

            if(String(result).charAt(-1) == 0){
                result = String(result);
                while(result.charAt(-1) == '0'){
                    result = result.slice(0, -1);
                };
                result = Number(result);
            };
        }
        displayDiv2.textContent = `=  ${result}`;
        displayDiv2.style.fontSize = '28px';
        displayDiv1.textContent = `${value1} ${operator} ${value2}`;
        displayDiv1.style.color = 'rgba(19, 245, 49, 0.374)';
        displayValue = result;
    };
    if((value1 !== 0 && value1 !== undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        displayDiv2.textContent = `=  ${value1}`;
        displayDiv2.style.fontSize = '28px';
        displayDiv1.textContent = `${value1} ${operator}`;
        displayDiv1.style.color = 'rgba(255, 255, 255, 0.600)';
    };
    if((value1 !== 0 && value1 !== undefined) && operator === '' && (value2 === 0 || value2 === undefined)){
        displayDiv2.textContent = `=  ${value1}`;
        displayDiv2.style.fontSize = '28px';
        displayDiv1.textContent = `${value1}`;
        displayDiv1.style.color = 'rgba(255, 255, 255, 0.600)';
    };
    if((value1 === 0 || value1 === undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        displayDiv2.textContent = `=  0`;
        displayDiv2.style.fontSize = '28px';
        displayDiv1.textContent = `0 ${operator}`;
        displayDiv1.style.color = 'rgba(255, 255, 255, 0.600)';
    };
    value1 = undefined;
    value2 = undefined;
    result = undefined;
    operator = '';
}


// Keyboard event handler
document.addEventListener('keydown', keyboardHandleKeydown);
function keyboardHandleKeydown (e){
    const keyPressed = e.key;
    if(keyboardInputs.numbers.indexOf(keyPressed) !== -1){
        displayDiv2.style.fontSize = '22px';
        numbersEventHandler(keyPressed);
    }
    if(keyboardInputs.operators.indexOf(keyPressed) !== -1){
        displayDiv2.style.fontSize = '22px';
       opEventHandler(keyPressed); 
    }
    if(keyPressed == 'Backspace'){
        backspaceEventHandler(keyPressed);
    }
    if(keyPressed == '=' || keyPressed == 'Enter'){
       equalEventHandler(keyPressed);  
    }
    if(keyPressed == 'Delete'){
        clear();
    } 
}