import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CreateStore } from 'redux';

const Label = (props) => (
  <div id={props.id}>
    {props.label}
  </div>
);

const BreakSettings = () => (
  <div id="break-settings">
    <Label id="break-label" label="Break Length" />
    <div id="break-decrement"><i className="fas fa-arrow-down" /></div>
    <div id="break-length">oi</div> 
    <div id="break-increment"><i className="fas fa-arrow-up" /></div>
  </div>
);

const SessionSettings = () => (
  <div id="session-settings">
    <Label id="session-label" label="Session Length" />
    <div id="session-decrement"><i className="fas fa-arrow-down" /></div>
    <div id="session-length">oi</div> 
    <div id="session-increment"><i className="fas fa-arrow-up" /></div>
  </div>
);

const Control = () => (
  <div id="start-stop">
    <i className="fas fa-play" />
    <i className="fas fa-pause" />
  </div>
);

const Timer = () => (
  <div id="timer">
    <Label id="timer-label" label="oi" />
    <Control />
  </div>
);


const PomodoroClock = () => (
  <div id="pomodoro-clock">
    <BreakSettings />
    <SessionSettings />
    <Timer />
  </div>
);

ReactDOM.render(<PomodoroClock />, document.getElementById('app'));