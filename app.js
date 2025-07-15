document.addEventListener('DOMContentLoaded', () => {
    const expressionDisplay = document.getElementById('expression-display');
    const resultDisplay = document.getElementById('result-display');
    const keypad = document.querySelector('.keypad');
    const themeToggle = document.getElementById('theme-toggle');

    let currentExpression = '';
    let resultCalculated = false;

    // --- Main Event Handler ---
    keypad.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.matches('button')) return;

        const { action, value } = target.dataset;

        if (action) {
            handleAction(action, value);
        } else if (value) {
            handleValue(value);
        }
    });

    // --- Input Handlers ---
    const handleValue = (value) => {
        if (resultCalculated) {
            currentExpression = '';
            resultCalculated = false;
        }
        currentExpression += value;
        updateDisplay();
    };

    const handleAction = (action) => {
        switch (action) {
            case 'clear':
                clearAll();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'decimal':
                addDecimal();
                break;
            case 'evaluate':
                evaluate();
                break;
            case 'sqrt':
                applyFunction('Math.sqrt');
                break;
        }
    };

    // --- Core Logic Functions ---
    const clearAll = () => {
        currentExpression = '';
        expressionDisplay.textContent = '';
        resultDisplay.textContent = '0';
        resultCalculated = false;
    };

    const deleteLast = () => {
        if (resultCalculated) {
            clearAll();
            return;
        }
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    };
    
    const addDecimal = () => {
        if (resultCalculated) {
             currentExpression = '0.';
             resultCalculated = false;
        } else {
            // Prevent multiple decimals in the same number segment
            const segments = currentExpression.split(/[\+\-\*\/%]/);
            if (!segments[segments.length - 1].includes('.')) {
                currentExpression += '.';
            }
        }
        updateDisplay();
    };

    const evaluate = () => {
        if (currentExpression === '') return;
        try {
            const sanitizedExpression = currentExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');

            // Using new Function() is safer than eval()
            const calculate = new Function('return ' + sanitizedExpression);
            const result = parseFloat(calculate().toFixed(10)); // Fix floating point issues
            
            expressionDisplay.textContent = currentExpression + '=';
            resultDisplay.textContent = result;
            currentExpression = result.toString();
            resultCalculated = true;

        } catch (error) {
            resultDisplay.textContent = 'Error';
            currentExpression = '';
            resultCalculated = true;
        }
    };
    
    const applyFunction = (func) => {
        try {
            const result = eval(`${func}(${currentExpression})`);
            expressionDisplay.textContent = `${func.replace('Math.', '')}(${currentExpression})`;
            resultDisplay.textContent = parseFloat(result.toFixed(10));
            currentExpression = result.toString();
            resultCalculated = true;
        } catch (error) {
            resultDisplay.textContent = 'Error';
            currentExpression = '';
            resultCalculated = true;
        }
    };

    const updateDisplay = () => {
        expressionDisplay.textContent = currentExpression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/-/g, '−');
        if (currentExpression === '') {
            resultDisplay.textContent = '0';
        }
    };

    // --- Theme Switcher Logic ---
    const setInitialTheme = () => {
        const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
        document.body.dataset.theme = savedTheme;
        themeToggle.checked = savedTheme === 'light';
    };
    
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.body.dataset.theme = newTheme;
        localStorage.setItem('calculator-theme', newTheme);
    });
    
    // Initialize
    setInitialTheme();
    clearAll();
});