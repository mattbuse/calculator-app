import React, { useReducer } from 'react';
import './App.css';
import NavBar from './navbar';
import DigitButton from './digitbutton';
import OperationButton from './operation';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload}) {
  switch (type) {

    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
      if (payload.digit === '0' && state.currentOperand === '') {
        return state
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }
      if (payload.digit === '.' && state.currentOperand === '') {
        return {
        ...state,
        currentOperand: `0${payload.digit}`
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: ''
        }
       }
      if (state.currentOperand === '') return state
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: '',
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
    }
    case ACTIONS.CLEAR:
    return {
      previousOperand: '',
      currentOperand: '',
    }
    case ACTIONS.CHOOSE_OPERATION:
    if (state.currentOperand === '' && state.previousOperand === '') {
      return state
    }
    if (state.currentOperand === '') {
      return {
        ...state,
        operation: payload.operation
      }
    }
    if (state.previousOperand === '') {
      return {
        ...state,
        previousOperand: state.currentOperand,
        operation: payload.operation,
        currentOperand: '',
      }
    }
    return {
      ...state,
      previousOperand: evaluate(state),
      operation: payload.operation,
      currentOperand: '',
    }
    case ACTIONS.EVALUATE:
      if (state.currentOperand === '' || state.previousOperand === '' || state.operation === '') {  
        return state
    }
    return {
        ...state,
        overwrite: true,
        previousOperand: '',
        operation: '',
        currentOperand: evaluate(state),
      }
    default: return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = prev + current;
      break
    case '-':
      computation = prev - current;
      break
    case '*':
      computation = prev * current;
      break
    case '÷':
      computation = prev / current;
      break
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == '') return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(reducer, {
  previousOperand: '',
  currentOperand: '',
  operation: '',
});

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <p>Welcome to my React Calculator!</p>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
          <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
}

export default App;