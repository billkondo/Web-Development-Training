import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'

class Display extends React.Component {
  render() {
    return (
      <div id="display">
        {this.props.toDisplay}
      </div>
    );
  }
}

class Button extends React.Component {
  vei = () => {
    console.log('vei');
  }
  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.id}
        onClick={() => this.props.click(this.props.name)}
        onKeyPress={this.vei}
      >
        {this.props.id}
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div id="buttons">
        <Button id="Q" click={this.props.click} press={this.props.press} name={"Heater-1"} keyCode={81}/>
        <Button id="W" />
        <Button id="E" />
        <Button id="A" />
        <Button id="S" />
        <Button id="D" />
        <Button id="Z" />
        <Button id="X" />
        <Button id="C" />
      </div>
    );
  }
}

class Volume extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class Power extends React.Component {
  render() {
    return (
      <div id="power">
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  state = {
    on: false,
    nameToDisplay: ""
  }

  clickButton = (soundName) => {
    this.setState({ nameToDisplay: soundName });
  }

  keyPress = () => {
    console.log('press');
    this.setState({ nameToDisplay: soundName });
  }

  render() {
    return (
      <div id="drum-machine">
        <Power />
        <Display toDisplay={this.state.nameToDisplay} />
        <Buttons
          click={this.clickButton}
          press={this.keyPress}
        />
        <Volume />
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('app'));