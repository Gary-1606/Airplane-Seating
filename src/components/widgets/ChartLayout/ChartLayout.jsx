import React from "react";
import classNames from "classnames";
import { objectCompare } from "../../utils/deps";
import "./styles.scss";

class ChartLayout extends React.Component {
  divToFocus = React.createRef();

  componentDidMount = () => {
    this.handleScroll();
  };
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (!objectCompare(nextProps?.chartData, this.props?.chartData)) {
      this.handleScroll();
    }
  };
  handleScroll = () => {
    if (this.divToFocus.current) {
      this.divToFocus.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  renderSectionLayout = (segment, segmentIndex, segmentCount) => {
    return (
      <React.Fragment>
        {Object.keys(segment).map((oneKey, i) => {
          return (
            <div
              className="airplane-row d-flex justify-content-around mb-2"
              key={i}
            >
              {segment[oneKey].map((position, index) => {
                const seatClassName =
                  (segmentIndex === 0 && index === 0) ||
                  (segmentIndex === segmentCount - 1 &&
                    index === segment[oneKey].length - 1)
                    ? "window"
                    : (index === 0 || index === segment[oneKey].length - 1) &&
                      (segmentIndex !== 0 || segmentIndex !== segmentCount - 1)
                    ? "aisle"
                    : "middle";
                return (
                  <span
                    className={classNames("seats", seatClassName)}
                    key={index}
                  >
                    {position === 0 ? "" : position}
                  </span>
                );
              })}
            </div>
          );
        })}
      </React.Fragment>
    );
  };
  renderLayout = () => {
    const { chartData } = this.props;
    const segmentCount = chartData.length;
    let layoutSplitVal = 12;
    if(segmentCount < 5) {
        layoutSplitVal = 12 / segmentCount;
    }
    return chartData.map((segment, index) => {
      return (
        <div className={classNames("mb-4",`col-${layoutSplitVal}`)} key={index}>
          <div className="bg-grey section-wrapper">
            <h4 className="text-center">{`Class ${index + 1}`}</h4>
            {this.renderSectionLayout(segment, index, segmentCount)}
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div ref={this.divToFocus} className="chart-layout-container mt-5">
        <h3 className="text-center mb-4">Chart Layout</h3>
        <div className="d-flex justify-content-end mb-4">
          <div className="icons d-flex align-items-center">
            <span className="tile color-green mx-2"></span>
            <span>Aisle Seats</span>
          </div>
          <div className="icons d-flex align-items-center">
            <span className="tile color-yellow mx-2"></span>
            <span>Window Seats</span>
          </div>
          <div className="icons d-flex align-items-center">
            <span className="tile color-blue mx-2"></span>
            <span>Middle Seats</span>
          </div>
        </div>

        <div className="row">{this.renderLayout()}</div>
      </div>
    );
  }
}

export default { ChartLayout };
export { ChartLayout };
