import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

const idArray = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

const keyCodeArray = [81, 87, 69, 65, 83, 68, 90, 88, 67];

const nameArray = [
  'Heater 1.0',
  'Heater 2.0',
  'Heater 3.0',
  'Heater 4.1',
  'Heater 6.0',
  'Chord 1.0',
  'Chord 2.0',
  'Chord 3.0',
  'Guitar Chord'
];

const urlArray = [
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  'http://scruss.com/wordpress/wp-content/uploads/2017/12/chord-G.wav'
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
  const styles = {
    borderColor: `${props.color}`,
    color: `${props.color}`
  }

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
  return (
    <div id="buttons">
      {
        idArray.map((curElement, index) => {
          return (
            <Button
              key={curElement}
              id={idArray[index]}
              name={nameArray[index]}
              mousedown={props.mousedown}
              mouseup={props.mouseup}
              source={urlArray[index]}
              index={index}
              color={props.on ? ColorsArray[index] : "#1B1B1B"}
            />
          )
        })
      }
    </div>
  );
}

const Volume = (props) => {
  return (
    <div id="volume">
      <input
        type="range"
        onChange={props.updateVolume}
        min={0}
        max={100}
        disabled={!props.on}
      />
    </div>
  );
}

const Options = (props) => {
  return (
    <div id="options"
      onClick={props.flipOption}
    >
      <input type="radio" name="left" disabled={!props.on} checked={!props.option} />
      <input type="radio" name="right" disabled={!props.on} checked={props.option} />
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
    if(this.state.on) {
      this.setState({
        nameToDisplay: soundName,
        borderColor: ColorsArray[index]
      });

      this.playSound(index);
      document.getElementById(idArray[index]).classList.toggle('buttonPressed');
    }
  }

  mouseUp = (index) => {
    if(this.state.on) 
      document.getElementById(idArray[index]).classList.toggle('buttonPressed');
  }

  keyDown = (e) => {
    if (this.state.on) {
      for (let i = 0; i < keyCodeArray.length; i++)
        if (keyCodeArray[i] === e.keyCode) {
          this.setState({
            nameToDisplay: nameArray[i],
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
      return { 
        on: !prevState.on,
        nameToDisplay: "",
        borderColor: "black"
      };
    });
  }

  updateVolume = (e) => {
    this.setState({
      volume: e.target.value,
      nameToDisplay: `Volume: ${e.target.value}%`
    });
  }

  flipOption = (e) => {
    this.setState((prevState) => {
      return { option: !prevState.option }
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
        <Power
          on={this.state.on}
          flip={this.flipState}
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
        />

        <Volume
          on={this.state.on}
          volume={this.state.volume}
          updateVolume={this.updateVolume}
        />

        <Options 
          on={this.state.on}
          flipOption={this.flipOption}
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