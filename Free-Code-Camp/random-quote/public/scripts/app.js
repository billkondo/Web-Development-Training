"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintQuote = function PrintQuote(props) {
  return React.createElement(
    "div",
    { id: "text" },
    props.quote
  );
};

var RandomQuoteMachine = function (_React$Component) {
  _inherits(RandomQuoteMachine, _React$Component);

  function RandomQuoteMachine(props) {
    _classCallCheck(this, RandomQuoteMachine);

    var _this = _possibleConstructorReturn(this, (RandomQuoteMachine.__proto__ || Object.getPrototypeOf(RandomQuoteMachine)).call(this, props));

    _this.state = {
      url: "https://talaikis.com/api/quotes/random/",
      quote: "",
      author: "",
      baseTwitterURL: "https://twitter.com/intent/tweet",
      currentTwitterURL: "https://twitter.com/intent/tweet"
    };
    return _this;
  }

  _createClass(RandomQuoteMachine, [{
    key: "getNewQuote",
    value: function (_getNewQuote) {
      function getNewQuote() {
        return _getNewQuote.apply(this, arguments);
      }

      getNewQuote.toString = function () {
        return _getNewQuote.toString();
      };

      return getNewQuote;
    }(function () {
      var _this2 = this;

      fetch(this.state.url).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.quote) {
          _this2.setState(function (prevState, props) {
            return {
              quote: data.quote,
              author: data.author,
              currentTwitterURL: prevState.baseTwitterURL + "?text=\"" + data.quote + "\", " + data.author + "&hashtags=quote"
            };
          });
        } else getNewQuote();
      });
    })
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getNewQuote();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { id: "quote-box" },
        React.createElement(
          "h1",
          null,
          "Quote Machine"
        ),
        React.createElement(PrintQuote, { quote: this.state.quote }),
        React.createElement(
          "footer",
          null,
          React.createElement(
            "button",
            { onClick: function onClick() {
                return _this3.getNewQuote();
              }, id: "new-quote" },
            "New Quote"
          ),
          React.createElement(
            "a",
            { href: this.state.currentTwitterURL, target: "_blank" },
            React.createElement(
              "button",
              { id: "tweet-quote" },
              React.createElement("i", { className: "fab fa-twitter" })
            )
          ),
          React.createElement(
            "div",
            { id: "author" },
            this.state.author ? this.state.author : "Unknown"
          )
        )
      );
    }
  }]);

  return RandomQuoteMachine;
}(React.Component);

ReactDOM.render(React.createElement(RandomQuoteMachine, null), document.getElementById('app'));
