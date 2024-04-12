expression = '';
nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Запускаем детектер ивентов на нажатие.
document.addEventListener('click', function(event) {
    event.target.blur();
    // Если кнопку нажали, то убираем фокус с нее, чтобы не было выделения.
    // При нажатии Enter она более не сработает.
});

function result() {
    inputTag = document.getElementById('input');
    if (expression === '') {
        return inputTag.value;
    }
    try {
        expression = eval(expression).toString();
        if (expression == Infinity || expression == -Infinity || expression == NaN) {
            expression = "Error";
            inputTag.value = 'Error';
        } else {
            inputTag.value = expression;
        }
    } catch (Error) {
        inputTag.value = 'Error';
        expression = '';
    }
}

function erase() {
    inputTag = document.getElementById('input');
    inputTag.value = '0';
    expression= '';
}

function backspace() {
    inputTag = document.getElementById('input');

    if (expression === "Error") {
        erase();
        return 0;
    }

    expression = expression.slice(0, -1);
    inputTag.value = expression;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Enter' || key === '=') {
        result();
    }
    if (key in nums) {
        printElement(event.key);
    }
    if (key === '+' || key === '-' || key === '/' || key === '*' || key === '.' || key === '(' || key === ')') {
        printElement(event.key);
    }
    if (key === 'Escape') {
        erase();
    }
    if (key === 'Backspace') {
        backspace();
    }
});

function checkIsThisSign(element) {
    if (element === '+' || element === '-' || element === '*' || element === '/' || element === '.') {
        return true;
    }
    return false;
}

function checkDoubleOperation() {
    if (checkIsThisSign(expression[expression.length-1])){
        return false;
    }
    return true;
}

function printElement(element) {
    inputTag = document.getElementById('input');

    if ((checkIsThisSign(element) && checkDoubleOperation()) || element in nums || element === '(' || element === ')') {
        expression += element;
        inputTag.value = expression;
    }
}
