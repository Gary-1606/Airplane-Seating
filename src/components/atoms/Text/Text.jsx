import React from "react";
import "./styles.scss";

class Text extends React.Component {
  render() {
    const { className, value, wrap = {}, children, title = "", qaAttribute = "" } = this.props;
    const { wrapClassName = "" } = wrap;
    const textEl = <span className={className} title={title} data-qa={qaAttribute}>{value ? value : children}</span>
    return (
      <>
        {(wrapClassName) ? <div className={wrapClassName} title={title}>{textEl}</div> : textEl}
      </>
    );
  }
}

export { Text };
export default { Text };
