import React, { useState } from 'react';
import './Calculator.css'; // Add styles for better UI if needed

function Calculator() {
    const [input, setInput] = useState('');

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                // Safely evaluate the input using Function constructor instead of eval
                const result = new Function(`return ${input}`)();
                setInput(result.toString());
            } catch {
                setInput('Error');
            }
        } else if (value === 'C') {
            setInput(''); // Clear the input
        } else {
            // Prevent multiple operators in a row
            if (
                ['+', '-', '*', '/'].includes(value) &&
                ['+', '-', '*', '/'].includes(input.slice(-1))
            ) {
                return;
            }
            setInput(input + value);
        }
    };

    // Define calculator buttons layout
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', 'C', '=', '+'
    ];

    return (
        <div className="calculator">
            <input type="text" value={input} readOnly className="calculator-input" />
            <div className="buttons">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(button)}
                        className="calculator-button"
                    >
                        {button}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calculator;
