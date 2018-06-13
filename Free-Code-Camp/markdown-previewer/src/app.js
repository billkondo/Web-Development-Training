import React from 'react';
import ReactDOM from 'react-dom';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const startValue = this.props.text;

    return (
      <div className="Editor">
        <textarea id="editor"
          value={startValue}
          onChange={(e) => this.props.changeMarkdown(e.target.value)}
        />
      </div>
    );
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
  }

  getHTML() {
    return {
      __html: marked(this.props.text, {
        sanitize: true
      })
    };
  }

  render() {
    return (
      <div className="Preview">
        <div id="prewiew"
          dangerouslySetInnerHTML={this.getHTML()}
        />
      </div>
    );
  }
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ""
    }

    this.changeMarkdown = this.changeMarkdown.bind(this);
  }

  changeMarkdown(text) {
    this.setState({ markdown: text });
  }

  componentWillMount() {
    const str = "```";
    const comment = "\\\\";

    const startMarkdown =
      ` # Welcome to Markdown Previewer
      \n ## Write markdown in this screen
      \n To remember the markdown syntax, check this [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
      \n To write inline code, we put the code between back-ticks. Like in this example: \`<div><div>\`.
      \n ${str}
      \n ${comment} This is a block code\n let msg = "Hello World!"\n alert(msg)
      \n ${str}
      \n Example of lists:
      \n * Use Asterisk for unordered list\n + You can also use pluses\n - And minuses
      \n 1. Use Numbers for ordered lists\n 2. Second Item
      \n\n You can also create blockquotes:
      `;

    console.log(startMarkdown);

    this.setState({ markdown: startMarkdown })
  }

  render() {
    return (
      <div className="MarkdownPreviewer">
        <Editor
          text={this.state.markdown}
          changeMarkdown={this.changeMarkdown}
        />
        <Preview
          text={this.state.markdown}
        />
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('app'));