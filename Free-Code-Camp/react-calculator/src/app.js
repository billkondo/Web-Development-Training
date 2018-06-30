import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss'

const Equals = () => {
  return (
    <div id="equals" className="button">
      <i className="fas fa-equals" />
    </div>
  );
}

const BackSpace = () => {
  return (
    <div id="backspace" className="button">
      <i className="fas fa-backspace" />
    </div>
  )
}

const ClearNumber = () => {
  return (
    <div id="clear-number" className="button">
      {"C"}
    </div>
  )
}

const Decimals = () => {
  return (
    <div id="decimal" className="button">
      .
    </div>
  )
}

const DisplayInput = () => {
  return (
    <div id="display-input">
    </div>
  );
}

const DisplayExpression = () => {
  return (
    <div id="display-expression">
    </div>
  );
}

const Display = (props) => {
  return (
    <div id="display">
      <DisplayExpression />
      <DisplayInput/>
    </div>
  );
}

const Clear = () => {
  return (
    <div id="clear" className="button">
      {"AC"}
    </div>
  )
}

const Addition = () => {
  return (
    <div id="add" className="button">
      <i className="fas fa-plus" />
    </div>
  );
}

const Subtraction = () => {
  return (
    <div id="subtract" className="button">
      <i className="fas fa-minus" />
    </div>
  );
}

const Multiplication = () => {
  return (
    <div id="multiply" className="button">
      <i className="fas fa-times" />
    </div>
  );
}

const Division = () => {
  return (
    <div id="divide" className="button">
      <i className="fas fa-divide" />
    </div>
  );
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
      <Clear />
      <Equals />
      <Addition />
      <Subtraction />
      <Multiplication />
      <Division />
      <Decimals />
      <BackSpace />
      <ClearNumber />

      {
        numbers.map((number) => {
          return (
            <div
              key={number}
              id={names[number]}
              className="button"
            >
              {number}
            </div>
          );
        })
      }
    </div>
  );
}

class Calculator extends React.Component {
  state = {
    result: Big(0)
  }

  render() {
    return (
      <div id="calculator">
        <Display result={this.state.result} />
        <Buttons />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('app'));