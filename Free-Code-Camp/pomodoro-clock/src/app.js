import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import './styles.scss';
import { strictEqual } from 'assert';

const Label = ({ id, label }) => (
  <div id={id}>
    {label}
  </div>
);

const BreakSettings = ({ length, clickIncrement, clickDecrement }) => (
  <div id="break-settings">
    <Label id="break-label" label="Break Length" />
    <div id="control-settings">
      <div id="break-decrement" onClick={() => clickDecrement()}><i className="fas fa-arrow-down" /></div>
      <div id="break-length">{length}</div>
      <div id="break-increment" onClick={() => clickIncrement()}><i className="fas fa-arrow-up" /></div>
    </div>
  </div>
);

const BREAK_SETTINGS = connect(
  (state) => ({
    length: state.breakLength
  }),
  (dispatch) => ({
    clickDecrement: () => dispatch(lengthAction(-1, true)),
    clickIncrement: () => dispatch(lengthAction(+1, true))
  })
)(BreakSettings);

const SessionSettings = ({ length, clickIncrement, clickDecrement }) => (
  <div id="session-settings">
    <Label id="session-label" label="Session Length" />
    <div id="control-settings">
      <div id="session-decrement" onClick={() => clickDecrement()}><i className="fas fa-arrow-down" /></div>
      <div id="session-length">{length}</div>
      <div id="session-increment" onClick={() => clickIncrement()}><i className="fas fa-arrow-up" /></div>
    </div>
  </div>
);

const SESSION_SETTINGS = connect(
  (state) => ({
    length: state.sessionLength
  }),
  (dispatch) => ({
    clickDecrement: () => dispatch(lengthAction(-1, false)),
    clickIncrement: () => dispatch(lengthAction(+1, false))
  })
)(SessionSettings);

const Settings = () => (
  <div id="settings">
    <BREAK_SETTINGS />
    <SESSION_SETTINGS />
  </div>
);

const Control = ({ isRunning, resetAll, timerTrigger, idInterval, updateID, timerChange }) => {
  const timerUpdate = () => setInterval(() => {
    timerChange();
  }, 1000)

  return (
    <div id="control">
      <div
        id="start-stop"
        onClick={() => {
          console.log('click');

          if (isRunning) {
            clearInterval(idInterval);
            updateID();
          }
          else {
            const id = timerUpdate();
            updateID(id);
          }

          timerTrigger();
        }}
      >
        {!isRunning && <i className="fas fa-play" />}
        {isRunning && <i className="fas fa-pause" />}
      </div>

      <div id="reset" onClick={() => resetAll()}>
        <i className="fas fa-sync-alt" />
      </div>
    </div>
  );
}

const CONTROL = connect(
  (state) => ({
    isRunning: state.running,
    idInterval: state.idInterval
  }),
  (dispatch) => ({
    timerTrigger: () => dispatch({ type: 'FLIP' }),
    resetAll: () => dispatch({ type: 'RESET' }),
    updateID: (id = -1) => dispatch({ type: 'UPDATE_ID', id }),
    timerChange: () => dispatch({ type: 'TIMER_DECREMENT' })
  })
)(Control);

const convertTimer = (seconds) => {
  const numberMinutes = Math.floor(seconds / 60);
  const numberSeconds = seconds % 60;

  const Minutes = (numberMinutes < 10) ? "0" + numberMinutes : numberMinutes.toString();
  const Seconds = (numberSeconds < 10) ? "0" + numberSeconds : numberSeconds.toString();

  return `${Minutes} : ${Seconds}`;
}

const Timer = ({ length, label }) => (
  <div id="timer">
    <Label id="timer-label" label={label} />
    <div id="time-left">{convertTimer(length)}</div>
    <CONTROL />
  </div>
);

const TIMER = connect(
  (state) => ({
    length: state.timerInSeconds,
    label: state.timerType ? 'Session' : 'Break'
  })
)(Timer);


const PomodoroClock = () => (
  <div id="pomodoro-clock">
    <Settings />
    <TIMER />
  </div>
);

const defaultState = {
  sessionLength: 25,
  breakLength: 5,
  timerType: true,
  timerInSeconds: 25 * 60,
  running: false,
  idInterval: -1
}

// Actions

const lengthAction = (add = 0, isBreak) => ({
  type: 'LENGTH_UPDATE',
  isBreak,
  add
});

// Reducers 

const lengthReducer = (state, action) => {
  if (action.isBreak) {
    if (state.breakLength + action.add <= 0 || state.breakLength + action.add > 60)
      return state;

    return {
      ...state,
      breakLength: state.breakLength + action.add,
    }
  }

  if (state.sessionLength + action.add <= 0 || state.sessionLength + action.add > 60)
    return state;

  return {
    ...state,
    sessionLength: state.sessionLength + action.add,
    timerInSeconds: (state.sessionLength + action.add) * 60
  }
}

const timerReducer = (state) => {
  return {
    ...state, 
    timerInSeconds: state.timerInSeconds - 1
  }
}

const reducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LENGTH_UPDATE':
      return lengthReducer(state, action);

    case 'FLIP':
      return {
        ...state,
        running: !state.running
      }

    case 'UPDATE_ID':
      return {
        ...state,
        idInterval: action.id
      }

    case 'TIMER_DECREMENT':
      return timerReducer(state);

    case 'RESET':
      return defaultState;

    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <PomodoroClock />
  </Provider>,
  document.getElementById('app'));