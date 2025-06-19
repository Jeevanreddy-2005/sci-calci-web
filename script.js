  let display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let previousInput = null;
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function inputNumber(num) {
            if (shouldResetDisplay) {
                currentInput = num;
                shouldResetDisplay = false;
            } else if (operator && currentInput.includes(' ' + operator + ' ')) {
                // If we have an operator displayed, continue adding to the expression
                currentInput += num;
            } else {
                currentInput = currentInput === '0' ? num : currentInput + num;
            }
            updateDisplay();
        }

        function inputOperator(op) {
            if (operator && !shouldResetDisplay) {
                calculate();
            }
            
            previousInput = currentInput;
            operator = op;
            currentInput = currentInput + ' ' + op + ' ';
            shouldResetDisplay = false;
            updateDisplay();
        }

        function calculate() {
            if (operator && previousInput !== null) {
                // Extract the second number from the display
                let parts = currentInput.split(' ' + operator + ' ');
                let current = parseFloat(parts[1] || parts[0]);
                let prev = parseFloat(previousInput);
                let result;

                switch (operator) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '×':
                        result = prev * current;
                        break;
                    case '÷':
                        result = current !== 0 ? prev / current : 'Error';
                        break;
                    case '%':
                        result = prev % current;
                        break;
                    default:
                        return;
                }

                currentInput = result.toString();
                operator = null;
                previousInput = null;
                shouldResetDisplay = true;
                updateDisplay();
            }
        }

        function clearAll() {
            currentInput = '0';
            operator = null;
            previousInput = null;
            shouldResetDisplay = false;
            updateDisplay();
        }

        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        function toggleSign() {
            if (currentInput !== '0') {
                currentInput = currentInput.startsWith('-') 
                    ? currentInput.slice(1) 
                    : '-' + currentInput;
                updateDisplay();
            }
        }

        function openScientific() {
            // Navigate to scientific calculator page
            window.location.href = 'calci.html';
        }

        function percentage() {
            let current = parseFloat(currentInput);
            currentInput = (current / 100).toString();
            updateDisplay();
        }

        function inputDecimal() {
            if (operator && currentInput.includes(' ' + operator + ' ')) {
                // If we have an operator, add decimal to the second number
                let parts = currentInput.split(' ' + operator + ' ');
                if (parts[1] && !parts[1].includes('.')) {
                    currentInput += '.';
                } else if (!parts[1]) {
                    currentInput += '0.';
                }
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay();
        }
document.querySelectorAll('.btn-op').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-op').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
function flashResult() {
  display.classList.add('result-flash');
  setTimeout(() => display.classList.remove('result-flash'), 400);
}

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                inputNumber(key);
            } else if (key === '+') {
                inputOperator('+');
            } else if (key === '-') {
                inputOperator('-');
            } else if (key === '*') {
                inputOperator('×');
            } else if (key === '/') {
                event.preventDefault();
                inputOperator('÷');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearAll();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key === '.') {
                inputDecimal();
            } else if (key === '%') {
                inputOperator('%');
            }
        });
     function toggleTheme() {
  document.body.classList.toggle("light");
}

    