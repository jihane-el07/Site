import React, { useState } from 'react';
import './Calculator.css'; // Ensure this file exists or comment this line out temporarily

const Calculator = () => {
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const handleCalculate = () => {
    try {
      const result = Function(`"use strict"; return (${display})`)();
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Invalid');
    }
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleDelete = () => {
    setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
  };

  const handleFunction = (func) => {
    try {
      const value = parseFloat(display) || 0;
      switch (func) {
        case 'sin':
          setDisplay(Math.sin(value).toString());
          break;
        case 'cos':
          setDisplay(Math.cos(value).toString());
          break;
        case 'tan':
          setDisplay(Math.tan(value).toString());
          break;
        case 'sqrt':
          setDisplay(Math.sqrt(value).toString());
          break;
        default:
          break;
      }
    } catch (error) {
      setDisplay('Invalid');
    }
  };

  return (
    <div className="container">
      <div className="entete">
        <input type="text" placeholder="0" value={display} disabled className="place" />
      </div>
      <div className="btns">
        <div className="row">
          <input type="button" value='CE' className='button operator' onClick={handleDelete}  />
          <input type="button" value='(' className='button operator' onClick={() => handleButtonClick('(')}  />
          <input type="button" value=')' className='button operator' onClick={() => handleButtonClick(')')} />
          <input type="button" value='AC' onClick={handleClear} className='button operator'  />
        </div>
        <div className="row">
          <button onClick={() => handleFunction('sin')} className="button operator">sin</button>
          <button onClick={() => handleFunction('cos')} className="button operator">cos</button>
          <button onClick={() => handleFunction('tan')} className="button operator">tan</button>
          <button onClick={() => handleFunction('sqrt')} className="button operator">&radic;</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('7')} className="button">7</button>
          <button onClick={() => handleButtonClick('8')} className="button">8</button>
          <button onClick={() => handleButtonClick('9')} className="button">9</button>
          <button onClick={() => handleButtonClick('/')} className="button operator">/</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('4')} className="button">4</button>
          <button onClick={() => handleButtonClick('5')} className="button">5</button>
          <button onClick={() => handleButtonClick('6')} className="button">6</button>
          <button onClick={() => handleButtonClick('*')} className="button operator">*</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('1')} className="button">1</button>
          <button onClick={() => handleButtonClick('2')} className="button">2</button>
          <button onClick={() => handleButtonClick('3')} className="button">3</button>
          <button onClick={() => handleButtonClick('-')} className="button operator">-</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick('0')} className="button">0</button>
          <button onClick={() => handleButtonClick('.')} className="button operator">.</button>
          <button onClick={handleCalculate} className="button egal">=</button>
          <button onClick={() => handleButtonClick('+')} className="button operator">+</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
