import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss'

class Editor extends React.Component {
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
  getHTML = () => {
    return {
      __html: marked(this.props.text)
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
  state = {
    markdown: ""
  }

  changeMarkdown = (text) => {
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
      \n ${str}\n ${comment} This is a block code\n\n let msg = "Hello World!"\n alert(msg)\n\n ${str}
      \n Example of lists:
      \n * Use Asterisk for unordered lists\n + You can also use pluses\n - And minuses\n
      \n 1. Use Numbers to create ordered lists\n 2. Second Item from List\n
      \n You can create blockquotes:
      \n > Blockquotes are userful to highlight some text\n
      \n To add an image, you can do this: \n\n![smile](https://upload.wikimedia.org/wikipedia/commons/7/73/Facebook_Haha_React.png)\n
      \n And finally, this is how we can get text emphasis:
      \n * Italics: *asterisks* or _underscores_\n * Bold: **asteriks** or __underscores__\n * Mix: **asterisks and _underscores_**\n * Strikethrough: ~~two tildes~~
      `;

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