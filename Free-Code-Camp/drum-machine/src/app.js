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
  }

  let sizeIcon = "fa-3x";

  if (window.matchMedia("(max-width: 700px)").matches)
    sizeIcon = "fa-lg";

  return (
    <div id="volume"
      style={stylesVolume}
    >
      <i
        className={`fas fa-volume-up ${sizeIcon} icon`}
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

  resizeWindow = () => this.forceUpdate();

  componentDidMount() {
    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    if (!window.mobilecheck()) {
      window.addEventListener('keydown', this.keyDown);
      window.addEventListener('keyup', this.keyUp);
    }

    window.addEventListener('resize', this.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('resize', this.resizeWindow);
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