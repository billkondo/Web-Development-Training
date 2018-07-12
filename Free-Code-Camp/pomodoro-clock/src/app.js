import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CreateStore } from 'redux';
import './styles.scss';

const Label = (props) => (
  <div id={props.id}>
    {props.label}
  </div>
);

const BreakSettings = () => (
  <div id="break-settings">
    <Label id="break-label" label="Break Length" />
    <div id="control-settings">
      <div id="break-decrement"><i className="fas fa-arrow-down" /></div>
      <div id="break-length">oi</div>
      <div id="break-increment"><i className="fas fa-arrow-up" /></div>
    </div>
  </div>
);

const SessionSettings = () => (
  <div id="session-settings">
    <Label id="session-label" label="Session Length" />
    <div id="control-settings">
      <div id="session-decrement"><i className="fas fa-arrow-down" /></div>
      <div id="session-length">oi</div>
      <div id="session-increment"><i className="fas fa-arrow-up" /></div>
    </div>
  </div>
);

const Settings = () => (
  <div id="settings">
    <BreakSettings />
    <SessionSettings />
  </div>
);

const Control = ({ type }) => (
  <div id="control">
    <div id="start-stop">
      {!type && <i className="fas fa-play" />}
      {type && <i className="fas fa-pause" />}
    </div>

    <div id="reset">
      <i className="fas fa-sync-alt" />
    </div>
  </div>
);

const Timer = () => (
  <div id="timer">
    <Label id="timer-label" label="Session" />
    <div id="time-left">50</div>
    <Control />
  </div>
);


const PomodoroClock = () => (
  <div id="pomodoro-clock">
    <Settings />
    <Timer />
  </div>
);

ReactDOM.render(<PomodoroClock />, document.getElementById('app'));