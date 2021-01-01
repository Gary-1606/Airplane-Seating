import React from "react";

class BookMark extends React.Component {
  static defaultProps = {
    width: "25px",
    height: "25px",
    className: "",
    viewBox: "0 0 381.3 381.3",
    onClick: null
  };
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={this.props.viewBox} //"0 0 381.3 381.3"
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        onClick={this.props.onClick}
      >
        <path
          fill="none"
          stroke="#000"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M296.6 71.5v299.9c0 1.9-1.4 3.7-3.5 4.5-.8.3-1.7.4-2.5.4-1.4 0-2.8-.4-4-1.2l-95.9-67.3-95.9 67.3c-1.8 1.3-4.3 1.6-6.5.7-2.1-.8-3.5-2.5-3.5-4.5V71.5c0-2.7 2.7-4.9 6.1-4.9h199.7c3.3 0 6 2.2 6 4.9z"
        />
      </svg>
      // <i className="material-icons">bookmark_border</i>
    );
  }
}

export { BookMark };
export default { BookMark };
