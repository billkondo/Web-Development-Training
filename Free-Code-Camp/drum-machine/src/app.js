import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

const idArray = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

const keyCodeArray = [81, 87, 69, 65, 83, 68, 90, 88, 67];

const nameArray = [
  [
    'Heater 1.0',
    'Heater 2.0',
    'Heater 3.0',
    'Heater 4.1',
    'Heater 6.0',
    'Chord 1.0',
    'Chord 2.0',
    'Chord 3.0',
    'Guitar Chord'
  ],
  [
    'Disc',
    'Kick n Hat',
    'RP4 Kick',
    'Dry Ohh',
    'Punchy Kick',
    'Side Stick',
    'Bass Drum 1.0',
    'Bass Drum 2.0',
    'Bass Drum 3.0'
  ]
];

const urlArray = [
  [
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    'http://scruss.com/wordpress/wp-content/uploads/2017/12/chord-G.wav'
  ],
  [
    'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    'http://www.denhaku.com/r_box/sr16/sr16bd/solid%20hl.wav',
    'http://bigsamples.free.fr/d_kit/bdkick/909_kik6.wav',
    'http://www.apo33.org/pub/puredata/APO/librairies_PD/recup/patches_obj/theLib/drum-machine/samples/BD01.WAV'
  ]
];

const ColorsArray = [
  "#FD3A4A", // Red Salsa
  "#FA5B3D", // Orange Soda
  "#FFF700", // Yellow Sunshine
  "#A7F432", // Green Lizard
  "#2243B6", // Denim Blue
  "#9C51B6", // Purple Prim
  "#FF5470", // Fiery Rose
  "#FF007C", // Winter Sky
  "#E936A7"  // Frostbite
];

const Display = (props) => {
  const styles = {
    borderColor: `${props.borderColor}`
  }

  return (
    <div id="display"
      style={styles}
    >
      {props.toDisplay}
    </div>
  );
}

const Button = (props) => {
  let styles = {
    borderColor: `${props.color}`,
    color: `${props.color}`
  }

  if (!props.on)
    styles.cursor = "default";

  return (
    <div
      className="drum-pad"
      id={props.id}
      onMouseDown={(e) => props.mousedown(props.name, props.index)}
      onMouseUp={(e) => props.mouseup(props.index)}
      style={styles}
    >

      <audio
        src={props.source}
        id={props.id}
        className={"clip"}
        volume={1.0}
      />

      {props.id}

    </div>
  );
}

const Buttons = (props) => {
  const type = (props.option) ? 1 : 0;

  return (
    <div id="buttons">
      {
        idArray.map((curElement, index) => {
          return (
            <Button
              key={curElement}
              id={idArray[index]}
              name={nameArray[type][index]}
              mousedown={props.mousedown}
              mouseup={props.mouseup}
              source={urlArray[type][index]}
              index={index}
              color={props.on ? ColorsArray[index] : "#1B1B1B"}
              on={props.on}
            />
          )
        })
      }
    </div>
  );
}

const Volume = (props) => {
  const stylesVolume = {};
  const stylesIcon = {};
  const stylesRange = {};

  if (!props.on) {
    stylesVolume.backgroundColor = "#1B1B1B";
    stylesVolume.border = "none";
    stylesIcon.color = "#353839";
    stylesRange.backgroundColor = "#353839";
    
  }

  return (
    <div id="volume"
      style={stylesVolume}
    >
      <i
        className="fas fa-volume-up fa-3x icon"
        style={stylesIcon}
      />
      <input
        type="range"
        onChange={props.updateVolume}
        min={0}
        max={100}
        disabled={!props.on}
        style={stylesRange}
      />
    </div>
  );
}

const Options = (props) => {
  let stylesOption = {};
  let stylesLetter = {};
  let stylesBox = {};
  let stylesButton = {};

  if (!props.on) {
    stylesOption.backgroundColor = "#1B1B1B";
    stylesOption.border = "none";
    stylesLetter.color = "#353839";
    stylesBox.backgroundColor = "#353839";
    stylesButton.backgroundColor = "#676767";
  }

  const invisible = {
    display: "none"
  }

  return (
    <div id="options"
      style={stylesOption}
    >
      <label style={stylesLetter}> Mode </label>
      <div style={stylesBox} id="box-options">
        <input
          onClick={props.flipOption}
          id="left-radio"
          type="radio"
          disabled={!props.on}
          style={props.option ? invisible : stylesButton}
        />

        <input
          onClick={props.flipOption}
          id="right-radio"
          type="radio"
          disabled={!props.on}
          style={!props.option ? invisible : stylesButton}
        />
      </div>
    </div>
  );
}

const Power = (props) => {
  return (
    <div id="power" onClick={props.flip}
      className={props.on ? "powerIsOn" : "powerIsOff"}
    >
      {!props.on ? "OFF" : "ON"}
    </div>
  );
}

const Control = (props) => {
  return (
    <div id="control">
      <Power
        on={props.on}
        flip={props.flipState}
      />

      <Options
        on={props.on}
        flipOption={props.flipOption}
        option={props.option}
      />

      <Volume
        on={props.on}
        volume={props.volume}
        updateVolume={props.updateVolume}
      />
    </div>
  );
}

class DrumMachine extends React.Component {
  state = {
    on: false,
    nameToDisplay: "",
    volume: 50,
    option: false,
    borderColor: "black"
  }

  playSound = (index) => {
    const audio = document.getElementById(idArray[index]).childNodes[0];
    audio.currentTime = 0;
    audio.volume = this.state.volume / 100;
    audio.play();
  }

  mouseDown = (soundName, index) => {
    if (this.state.on) {
      this.setState({
        nameToDisplay: soundName,
        borderColor: ColorsArray[index]
      });

      this.playSound(index);
      document.getElementById(idArray[index]).classList.toggle('buttonPressed');
    }
  }

  mouseUp = (index) => {
    if (this.state.on)
      document.getElementById(idArray[index]).classList.toggle('buttonPressed');
  }

  keyDown = (e) => {
    if (this.state.on) {
      const type = (this.state.option) ? 1 : 0;

      for (let i = 0; i < keyCodeArray.length; i++)
        if (keyCodeArray[i] === e.keyCode) {
          this.setState({
            nameToDisplay: nameArray[type][i],
            borderColor: ColorsArray[i]
          });

          this.playSound(i);
          document.getElementById(idArray[i]).classList.toggle('buttonPressed');
        }
    }
  }

  keyUp = (e) => {
    if (this.state.on) {
      for (let i = 0; i < keyCodeArray.length; i++)
        if (keyCodeArray[i] === e.keyCode)
          document.getElementById(idArray[i]).classList.toggle('buttonPressed');
    }
  }

  flipState = () => {
    this.setState((prevState) => {
      const nextColor = (!prevState.on) ? "#61dafb" : "black";
      return {
        on: !prevState.on,
        nameToDisplay: "",
        borderColor: nextColor
      };
    });
  }

  updateVolume = (e) => {
    this.setState({
      volume: e.target.value,
      nameToDisplay: `Volume: ${e.target.value}%`,
      borderColor: "#391285"
    });
  }

  flipOption = (e) => {
    if (!this.state.on)
      return;

    this.setState((prevState) => {
      let newMode = "Melody Mode";

      if (!prevState.option)
        newMode = "Percussion Mode";

      return {
        option: !prevState.option,
        borderColor: "#391285",
        nameToDisplay: newMode
      }
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  render() {
    return (
      <div id="drum-machine">
        <Control
          on={this.state.on}
          flipState={this.flipState}
          volume={this.state.volume}
          updateVolume={this.updateVolume}
          flipOption={this.flipOption}
          option={this.state.option}
        />

        <Display
          on={this.state.on}
          toDisplay={this.state.nameToDisplay}
          borderColor={this.state.borderColor}
        />

        <Buttons
          mousedown={this.mouseDown}
          mouseup={this.mouseUp}
          on={this.state.on}
          option={this.state.option}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <DrumMachine />,
  document.getElementById('app')
);