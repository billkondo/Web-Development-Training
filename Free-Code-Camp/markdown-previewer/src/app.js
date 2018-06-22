import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const Header = (props) => {
  const type = props.type;
  const inSmallScreen = window.matchMedia("(max-width: 800px)").matches;

  return (
    <div className="Header">
      <div>
        <i className="fab fa-free-code-camp icon-page fa-lg" />
        <div className="text-header"> {(!props.doubleView || !inSmallScreen) && props.title} </div>

        {
          props.zoom ?
            <i
              className="far fa-window-restore fa-lg header-button"
              onClick={() => props.changeState(type)}
            /> :
            <i
              className="far fa-window-maximize fa-lg header-button"
              onClick={() => props.changeState(type)}
            />
        }

        {
          !props.zoom && !props.type &&
          <i
            className="fas fa-th-large header-button fa-lg"
            onClick={props.toggleView}
          />
        }
      </div>
    </div>
  );

}

const Editor = (props) => {
  const getFullScreen = () => {
    if (!props.zoom && !props.doubleView)
      return {};

    const fullscreen = {
      height: "95%",
      width: "80%",
    }

    if (window.matchMedia("(max-width: 800px)").matches || props.doubleView) {
      fullscreen.height = "100%";
      fullscreen.width = "100%";
      fullscreen.margin = "0";
    }

    return fullscreen;
  }

  const startValue = props.text;

  let styles = {};

  const full = {
    height: "100%",
    padding: "10px"
  }

  return (
    <div
      style={getFullScreen()}
      className="Editor"
    >

      <Header
        title={props.title}
        changeState={props.changeState}
        zoom={props.zoom}
        type={0}
        toggleView={props.toggleView}
        doubleView={props.doubleView}
      />

      <textarea id="editor"
        value={startValue}
        onChange={(e) => props.changeMarkdown(e.target.value)}
        style={props.zoom || props.doubleView ? full : {}}
      />

    </div>
  );
}

class Preview extends React.Component {
  getHTML = () => {
    return {
      __html: marked(this.props.text, {
        breaks: true
      })
    };
  }

  correctLinks = () => {
    let links = document.getElementById('preview').getElementsByTagName('a');

    for (let i = 0; i < links.length; i++)
      links[i].target = "_blank";
  }

  componentDidMount() {
    this.correctLinks();
  }

  componentDidUpdate() {
    this.correctLinks();
  }

  getFullScreen = () => {
    if (!this.props.zoom && !this.props.doubleView)
      return {};

    const fullscreen = {
      height: "95%",
      width: "80%",
    }

    const superWidth = window.innerWidth / 2;

    if (window.matchMedia("(max-width: 800px)").matches || this.props.doubleView) {
      fullscreen.height = "100%";
      fullscreen.width = "100%";
      fullscreen.margin = "0";
    }

    if (this.props.doubleView)
      fullscreen.width = `${superWidth}px`;

    return fullscreen;
  }

  getFull = () => {
    const full = {
      padding: "10px",
      maxHeight: "100%",
    }

    if (window.matchMedia("(max-width: 800px)").matches || this.props.doubleView) {
      full.height = "100%";
      full.margin = "0";
    }

    return full;
  }

  render() {
    return (
      <div
        style={this.getFullScreen()}
        className="Preview"
      >

        <Header
          title={this.props.title}
          changeState={this.props.changeState}
          zoom={this.props.zoom}
          type={1}
          doubleView={this.props.doubleView}
        />

        <div id="preview"
          dangerouslySetInnerHTML={this.getHTML()}
          style={this.props.zoom || this.props.doubleView ? this.getFull() : {}}
        />

      </div>
    );
  }
}

class MarkdownPreviewer extends React.Component {
  state = {
    markdown: "",
    zoomEditor: false,
    zoomPreview: false,
    doubleView: false
  }

  changeMarkdown = (text) => {
    this.setState({ markdown: text });
  }

  changeState = (type) => {
    if (!type) {
      this.setState((prevState, props) => {
        return { zoomEditor: !prevState.zoomEditor }
      });
    }
    else {
      this.setState((prevState, props) => {
        return { zoomPreview: !prevState.zoomPreview }
      });
    }
  }

  doubleViewToggle = () => {
    this.setState((prevState) => {
      return { doubleView: !prevState.doubleView }
    });
  }

  updatePage = () => this.forceUpdate();

  componentWillMount() {
    const str = "```";
    const comment = "\\\\";

    const startMarkdown =
      `# Welcome to Markdown Previewer
      \n## Write markdown in this screen
      \nTo remember the markdown syntax, check this [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
      \nTo write inline code, we put the code between back-ticks. Like in this example: \`<div></div>\`.
      \n${str}\n${comment} This is a block code\n\nlet msg = "Hello World!"\nalert(msg)\n\n${str}
      \nExample of lists:
      \n* Use Asterisk for unordered lists\n+ You can also use pluses\n- And minuses\n
      \n1. Use Numbers to create ordered lists\n2. Second Item from List\n
      \nYou can create blockquotes:
      \n> Blockquotes are userful to highlight some text\n
      \nTo add an image, you can do this: \n\n![smile](https://upload.wikimedia.org/wikipedia/commons/7/73/Facebook_Haha_React.png)\n
      \nAnd finally, this is how we can get text emphasis:
      \n* Italics: *asterisks* or _underscores_\n* Bold: **asteriks** or __underscores__\n* Mix: **asterisks and _underscores_**\n* Strikethrough: ~~two tildes~~
      `;

    this.setState({ markdown: startMarkdown });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePage);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePage);
  }

  render() {
    let styles = {};

    const fullscreen = {
      gridTemplateRows: "1fr"
    }

    const doubleScreen = {
      gridTemplateRows: "1fr",
      gridTemplateColumns: "1fr 1fr"
    }

    if (this.state.zoomEditor || this.state.zoomPreview)
      styles = fullscreen;
    else
      if (this.state.doubleView)
        styles = doubleScreen;

    return (
      <div
        style={styles}
        className="MarkdownPreviewer"
      >
        {!this.state.zoomPreview &&
          <Editor
            text={this.state.markdown}
            changeMarkdown={this.changeMarkdown}
            title={"Editor"}
            zoom={this.state.zoomEditor}
            changeState={this.changeState}
            toggleView={this.doubleViewToggle}
            doubleView={this.state.doubleView}
          />
        }

        {!this.state.zoomEditor &&
          <Preview
            text={this.state.markdown}
            title={"Preview"}
            zoom={this.state.zoomPreview}
            changeState={this.changeState}
            doubleView={this.state.doubleView}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('app'));