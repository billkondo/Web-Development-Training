const PrintQuote = (props) => {
  return (
    <div id="text">
      {props.quote}
    </div>
  );
}

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `https://talaikis.com/api/quotes/random/`,
      quote: "",
      author: "",
      baseTwitterURL: "https://twitter.com/intent/tweet",
      currentTwitterURL: "https://twitter.com/intent/tweet"
    }
  }

  getNewQuote() {
    fetch(this.state.url)
      .then(response => response.json())
      .then(data => {
        if (data.quote) {
          this.setState((prevState, props) => {
            return {
              quote: data.quote,
              author: data.author,
              currentTwitterURL: `${prevState.baseTwitterURL}?text="${data.quote}", ${data.author}&hashtags=quote`
            }
          });
        }
        else
          getNewQuote();
      });
  }

  componentWillMount() {
    this.getNewQuote();
  }

  render() {
    return (
      <div id="quote-box">
        <h1>Quote Machine</h1>

        <PrintQuote quote={this.state.quote} />

        <footer>
          <button onClick={() => this.getNewQuote()} id="new-quote">New Quote</button>
          <a href={this.state.currentTwitterURL} target="_blank"><button id="tweet-quote"><i className="fab fa-twitter"></i></button></a>
          <div id="author">
            {
              this.state.author ? this.state.author : "Unknown"
            }
          </div>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('app'));