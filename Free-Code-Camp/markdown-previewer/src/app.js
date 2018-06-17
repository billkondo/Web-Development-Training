import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div>
          <i className="fab fa-free-code-camp icon-page fa-lg"></i>
          <div className="text-header"> {this.props.title} </div>

          {
            this.props.zoom ? 
            <i className="far fa-window-restore fa-lg header-button"></i> :
            <i className="far fa-window-maximize fa-lg header-button"></i>
          }
        </div>
      </div>
    );
  }
}

class Editor extends React.Component {
  render() {
    const startValue = this.props.text;

    return (
      <div className="Editor">
        <Header 
          title={this.props.title}
        />

        <textarea id="editor"
          value={startValue}
          onChange={(e) => this.props.changeMarkdown(e.target.value)}
        />
      </div>
    );
  }
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

  render() {
    return (
      <div className="Preview">
        <Header 
          title={this.props.title}
        />

        <div id="preview"
          dangerouslySetInnerHTML={this.getHTML()}
        />
      </div>
    );
  }
}

class MarkdownPreviewer extends React.Component {
  state = {
    markdown: "",
    zoomEditor: false, 
    zoomPreview: false
  }

  changeMarkdown = (text) => {
    this.setState({ markdown: text });
  }

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

    this.setState({ markdown: startMarkdown })
  }

  render() {
    return (
      <div className="MarkdownPreviewer">
        { !this.zoomPreview && 
          <Editor
            text={this.state.markdown}
            changeMarkdown={this.changeMarkdown}
            title={"Editor"}
            zoom={this.zoomEditor}
          />
        }

        { !this.zoomEditor &&
          <Preview
            text={this.state.markdown}
            title={"Preview"}
            zoom={this.zoomPreview}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('app'));