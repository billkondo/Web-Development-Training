import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import './styles.scss';

const alarmLink = "https://www.freesfx.co.uk/rx2/mp3s/5/16901_1461333025.mp3";

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

class Control extends React.Component {
  timerUpdate = () => setInterval(() => {
    this.props.timerChange();
  }, 1000);

  playSound = () => {
    const audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play();
  }

  clearAudio = () => {
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }

  componentWillUpdate() {
    if (this.props.timerInSec === 0) {
      if (this.props.running) {
        this.props.flipMode();

        this.playSound();
      }
    }
  }

  render() {
    return (
      <div id="control">
        <div
          id="start_stop"
          onClick={
            () => {
              if (this.props.running)
                clearInterval(this.id);
              else
                this.id = this.timerUpdate();

              this.props.timerTrigger();
            }}
        >
          {!this.props.running && <i className="fas fa-play" />}
          {this.props.running && <i className="fas fa-pause" />}
        </div>

        <div id="reset"
          onClick={
            () => {
              clearInterval(this.id)
              this.clearAudio();
              this.props.resetAll();
            }
          }>
          <i className="fas fa-sync-alt" />
        </div>
      </div>
    );
  }
}

const CONTROL = connect(
  (state) => ({
    running: state.running,
    timerInSec: state.timerInSeconds
  }),
  (dispatch) => ({
    timerTrigger: () => dispatch({ type: 'FLIP' }),
    resetAll: () => dispatch({ type: 'RESET' }),
    timerChange: () => dispatch({ type: 'TIMER_DECREMENT' }),
    flipMode: () => dispatch(({ type: 'FLIP_MODE' }))
  })
)(Control);

const convertTimer = (seconds) => {
  const numberMinutes = Math.floor(seconds / 60);
  const numberSeconds = seconds % 60;

  const Minutes = (numberMinutes < 10) ? "0" + numberMinutes : numberMinutes.toString();
  const Seconds = (numberSeconds < 10) ? "0" + numberSeconds : numberSeconds.toString();

  return `${Minutes}:${Seconds}`;
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
    label: state.timerMode ? 'Session' : 'Break'
  })
)(Timer);


const PomodoroClock = () => (
  <div id="pomodoro-clock">
    <Settings />
    <TIMER />
    <audio
      id="beep"
      src={alarmLink}
      volume={1.0}
    />
  </div>
);

const defaultState = {
  sessionLength: 25,
  breakLength: 5,
  timerMode: true,
  timerInSeconds: 25 * 60,
  running: false
}

// Actions

const lengthAction = (add = 0, isBreak) => ({
  type: 'LENGTH_UPDATE',
  isBreak,
  add
});

// Reducers 

const lengthReducer = (state, action) => {
  if (state.running)
    return state;

  if (action.isBreak) {
    if (state.breakLength + action.add <= 0 || state.breakLength + action.add > 60)
      return state;

    const newTime = (!state.timerMode) ? (state.breakLength + action.add) * 60 : state.timerInSeconds;

    return {
      ...state,
      breakLength: state.breakLength + action.add,
      timerInSeconds: newTime
    }
  }

  if (state.sessionLength + action.add <= 0 || state.sessionLength + action.add > 60)
    return state;

  const newTime = (state.timerMode) ? (state.sessionLength + action.add) * 60 : state.timerInSeconds;

  return {
    ...state,
    sessionLength: state.sessionLength + action.add,
    timerInSeconds: newTime
  }
}

const timerReducer = (state) => {
  return {
    ...state,
    timerInSeconds: state.timerInSeconds - 1
  }
}

const modeReducer = (state) => {
  const newTime = (state.timerMode) ? (state.breakLength * 60) : (state.sessionLength * 60);
  return {
    ...state,
    timerMode: !state.timerMode,
    timerInSeconds: newTime
  }
}

const resetReducer = () => defaultState;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LENGTH_UPDATE':
      return lengthReducer(state, action);

    case 'FLIP':
      return {
        ...state,
        running: !state.running
      }

    case 'TIMER_DECREMENT':
      return timerReducer(state);

    case 'FLIP_MODE':
      return modeReducer(state);

    case 'RESET':
      return resetReducer();

    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <PomodoroClock />
  </Provider>,
  document.getElementById('app'));