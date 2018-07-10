import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './styles.scss';

const Equals = ({ onClickEquals }) => (
  <div id="equals" className="button" onClick={() => onClickEquals()}>
    <i className="fas fa-equals" />
  </div>
);

const EQUALS = connect(
  (_) => ({}),
  (dispatch) => ({
    onClickEquals: () => dispatch({ type: 'EQUAL' })
  })
)(Equals);

const BackSpace = ({ backspace }) => (
  <div id="backspace" className="button" onClick={() => backspace()}>
    <i className="fas fa-backspace" />
  </div>
);

const BACKSPACE = connect(
  (_) => ({}),
  (dispatch) => ({
    backspace: () => dispatch({ type: 'BACKSPACE' })
  })
)(BackSpace);

const ClearNumber = ({ clear_number }) => (
  <div id="clear-number" className="button" onClick={() => clear_number()}>
    {"C"}
  </div>
);

const CLEAR_NUMBER = connect(
  (_) => ({}),
  (dispatch) => ({
    clear_number: () => dispatch({ type: 'CLEAR_NUMBER' })
  })
)(ClearNumber)

const Decimals = ({ decimals }) => (
  <div id="decimal" className="button" onClick={() => decimals()}>
    .
    </div>
);

const DECIMALS = connect(
  (_) => ({}),
  (dispatch) => ({
    decimals: () => dispatch({ type: 'DECIMAL' })
  })
)(Decimals);

const DisplayInput = ({ input }) => (
  <div id="display-input">
    {input ? input : "0"}
  </div>
);

const DISPLAY_INPUT = connect(
  (state) => ({ input: state.value })
)(DisplayInput);

const DisplayExpression = ({ expression }) => (
  <div id="display-expression">
    {expression}
  </div>
);

const DISPLAY_EXPRESSION = connect(
  (state) => ({
    expression: state.chain
  })
)(DisplayExpression)

const Display = () => {
  return (
    <div id="display">
      <DISPLAY_EXPRESSION />
      <DISPLAY_INPUT />
    </div>
  );
}

const Clear = ({ clearAll }) => (
  <div id="clear" className="button" onClick={() => clearAll()}>
    {"AC"}
  </div>
)

const CLEAR = connect(
  (_) => ({}),
  (dispatch) => ({
    clearAll: () => dispatch({ type: 'CLEAR' })
  })
)(Clear)

const OperatorComponent = (PassedComponent) => {
  const Component = connect(
    (_) => ({}),
    (dispatch) => ({
      operation: (type) => dispatch(operationAction(type))
    })
  )(PassedComponent);

  return <Component />;
}

const Addition = ({ operation }) => (
  <div id="add" className="button" onClick={() => operation('+')}>
    <i className="fas fa-plus" />
  </div>
);

const Subtraction = ({ operation }) => (
  <div id="subtract" className="button" onClick={() => operation('-')}>
    <i className="fas fa-minus" />
  </div>
);


const Multiplication = ({ operation }) => (
  <div id="multiply" className="button" onClick={() => operation('*')}>
    <i className="fas fa-times" />
  </div>
);

const Division = ({ operation }) => (
  <div id="divide" className="button" onClick={() => operation('/')}>
    <i className="fas fa-divide" />
  </div>
);


const generateDigitComponent = (indexArgs, nameArgs) => {
  const Digit = ({ index, name, click }) => (
    <div
      id={name}
      className="button"
      onClick={() => click(index)}
    >
      {index}
    </div>
  );

  const DigitComponent = connect(
    (_, ownProps) => ({
      index: ownProps.index,
      name: ownProps.name
    }),
    (dispatch) => ({
      click: (index) => dispatch(digitAction(index))
    })
  )(Digit);

  return <DigitComponent index={indexArgs} name={nameArgs} key={indexArgs} />;
}

const Buttons = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const names =
    [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine'
    ];

  return (
    <div id="buttons">
      <CLEAR />
      <EQUALS />
      {OperatorComponent(Addition)}
      {OperatorComponent(Subtraction)}
      {OperatorComponent(Multiplication)}
      {OperatorComponent(Division)}
      <DECIMALS />
      <BACKSPACE />
      <CLEAR_NUMBER />

      {
        numbers.map((number) => generateDigitComponent(number, names[number]))
      }
    </div>
  );
}

class Calculator extends React.Component {
  render() {
    return (
      <div id="calculator">
        <Display />
        <Buttons />
      </div>
    );
  }
}

const errorMessage = "Division By Zero";

// REDUX 

const defaultState = {
  chain: [],
  value: "",
  reset: false,
  isLastOperation: false
}

const errorState = {
  chain: [],
  value: errorMessage,
  isLastOperation: false,
  reset: true
}

const operationAction = (op) => ({
  type: 'OPERATION',
  op
})

const digitAction = (digit) => ({
  type: 'NUMBER',
  digit
})

const addDecimal = (state) => {
  if (state.value === errorMessage)
    return state;

  if (state.reset)
    return {
      ...state,
      reset: false,
      isLastOperation: false,
      value: "0."
    }

  if (state.value.indexOf('.') === -1) {
    if (!state.value)
      return {
        ...state,
        isLastOperation: false,
        value: "0."
      }

    return {
      ...state,
      isLastOperation: false,
      value: state.value.concat('.')
    }
  }

  return state;
}

const removeDigit = (number) => {
  const len = number.length;

  console.log(number);

  if (number === errorMessage)
    return "";

  if (len) {
    if (number[len] === '.') {
      if (len === 2) return "";
      return number.substr(0, len - 1);
    }

    return number.substr(0, len - 1);
  }

  return number;
}

const getResult = (operations) => {
  // console.log(operations);

  if (!operations.length)
    return "0";

  let result = new Big(operations[0].trim());

  for (let i = 1; i + 1 < operations.length; i += 2) {
    switch (operations[i]) {
      case '+': {
        result = result.plus(Big(operations[i + 1].trim()));
        break;
      }

      case '-': {
        result = result.minus(Big(operations[i + 1].trim()));
        break;
      }

      case '*': {
        result = result.times(Big(operations[i + 1].trim()));
        break;
      }

      case '/': {
        if (operations[i + 1].trim() === "0")
          return errorMessage;

        result = result.div(Big(operations[i + 1].trim()));
        break;
      }
    }
  }

  return result.toString();
}

const addOperator = (state, op) => {
  if (state.value === errorMessage)
    return state;

  const len = state.chain.length;

  if (len && state.isLastOperation)
    return {
      ...state,
      chain: state.chain.slice(0, len - 1).concat([op])
    }

  if (state.reset)
    return {
      ...state,
      chain: state.chain.concat(state.value ? ` ${state.value} ` : " 0 ").concat([op])
    }

  if (!state.value) {
    if (getResult(state.chain.concat([" 0 "]).concat([op])) === errorMessage)
      return errorState;

    return {
      chain: state.chain.concat([" 0 "]).concat([op]),
      value: getResult(state.chain.concat([" 0 "]).concat([op])),
      reset: true,
      isLastOperation: true
    }
  }

  if (getResult(state.chain.concat([` ${state.value} `]).concat([op])) === errorMessage)
    return errorState;

  return {
    chain: state.chain.concat([` ${state.value} `]).concat([op]),
    value: getResult(state.chain.concat([` ${state.value} `]).concat([op])),
    reset: true,
    isLastOperation: true
  }
}

const addDigit = (state, digit) => {
  if (state.reset) {
    if (digit)
      return {
        ...state,
        isLastOperation: false,
        reset: false,
        value: `${digit}`
      }

    return {
      ...state,
      value: "",
      reset: false,
      isLastOperation: false
    }
  }

  if (state.value.length || digit)
    return {
      ...state,
      isLastOperation: false,
      value: state.value.concat(`${digit}`)
    }

  return {
    ...state,
    isLastOperation: false
  }
}

const applyEqual = (state) => {
  const number = state.value ? state.value : "0";
 
  if (getResult(state.chain.concat(number)) === errorMessage)
    return errorState;

  return {
    reset: true,
    isLastOperation: false,
    chain: [],
    value: getResult(state.chain.concat(number))
  }
}

const calculator = (state = defaultState, action) => {
  // console.log(action);

  switch (action.type) {
    case 'NUMBER':
      return addDigit(state, action.digit);

    case 'CLEAR':
      return defaultState;

    case 'BACKSPACE':
      return {
        ...state,
        value: !state.reset ? removeDigit(state.value) : state.value,
        isLastOperation: !state.reset ? false : state.isLastOperation
      }

    case 'DECIMAL':
      return addDecimal(state);

    case 'CLEAR_NUMBER':
      return {
        ...state,
        value: "",
        isLastOperation: false,
        reset: false
      }

    case 'OPERATION':
      return addOperator(state, action.op)

    case 'EQUAL':
      return applyEqual(state);

    default:
      return state;
  }
}

const store = createStore(calculator);

Big.DP = 6;

ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById('app'));

store.subscribe(() => {
  // console.log(store.getState());
});