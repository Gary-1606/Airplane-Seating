import React from "react";
import { Button } from "../../atoms";
import {
  isNumber,
  isNonEmptyValue,
  deepCopy
} from "../../utils/deps";
import { constant } from "../../utils/stringHelper";
import { errorBoundary } from "../../ErrorBoundary";
import "./styles.scss";

class BookingInput extends React.Component {
  state = {
    segments: [
      {
        id: 1,
        name: "2 segments",
      },
      {
        id: 2,
        name: "3 segments",
      },
      {
        id: 3,
        name: "4 segments",
      },
    ],
    selectedSegment: null,
    segmentCount: null,
    flightSegments: null,
    passengerCount: null,
    showDataEntry: false,
  };
  isButtonDisabled = () => {
    const { passengerCount, flightSegments } = this.state;
    if (flightSegments && flightSegments.length) {
      const validFlightSegments = flightSegments?.filter((item) => {
        return item.noOfRows && item.noOfColumns;
      });
      if (
        validFlightSegments.length < flightSegments.length ||
        passengerCount === undefined ||
        passengerCount === null ||
        passengerCount < 0
      ) {
        return true;
      }
      return false;
    }
  };
  onCountBlur = (event, type) => {
    const { value } = event.currentTarget;
    if (!isNumber(value) || !isNonEmptyValue(value)) {
      errorBoundary({
        message: constant.ENTER_VALID_VAL,
        isError: true,
      });
      event.target.focus();
    } else {
      if (Number(value) <= 0) {
        errorBoundary({
          message: constant.ENTER_VALID_VAL,
          isError: true,
        });
        event.target.focus();
        return;
      }
      switch (type.toLowerCase()) {
        case "passenger":
          this.setState({
            passengerCount: Math.floor(Number(value)),
          });
          break;
        case "segment":
          this.setState({
            segmentCount: Math.floor(Number(value)),
            showDataEntry: true,
            flightSegments: Array(Math.floor(Number(value))).fill({}),
          });
          if (Math.floor(Number(value)) > 0) {
            this.isButtonDisabled();
          }
          break;
        default:
          break;
      }
    }
  };
  onCountChange = (event, type) => {
    const { value } = event.currentTarget;
    switch (type.toLowerCase()) {
      case "passenger":
        this.setState({
          passengerCount: Math.floor(Number(value)),
        });
        break;
      case "segment":
        this.setState({
          segmentCount: Math.floor(Number(value)),
          flightSegments: Array(Math.floor(Number(value))).fill({}),
        });
        break;
      default:
        break;
    }
    const {hideChartLayout} = this.props;
    if(hideChartLayout) {
        hideChartLayout();
    }
  };
  onInputBlur = (event, index, type) => {
    const { value } = event.currentTarget;
    if (!isNumber(value) || !isNonEmptyValue(value)) {
      errorBoundary({
        message: constant.ENTER_VALID_VAL,
        isError: true,
      });
      event.target.focus();
    } else {
      if (Number(value) <= 0) {
        errorBoundary({
          message: constant.ENTER_VALID_VAL,
          isError: true,
        });
        event.target.focus();
        return;
      }
      const { flightSegments } = this.state;
      let newFlightSegments = deepCopy(flightSegments);
      switch (type) {
        case "row":
          newFlightSegments[index].noOfRows = Math.floor(Number(value));
          break;
        case "column":
          
          newFlightSegments[index].noOfColumns = Math.floor(Number(value));
          break;
        default:
          break;
      }
      this.setState({
        flightSegments: newFlightSegments,
      });
    }
  };
  onButtonClick = () => {
    const { passengerCount, flightSegments } = this.state;
    let totalSeatingCapacity = 0;
    flightSegments.forEach((item) => {
      totalSeatingCapacity = totalSeatingCapacity + item.noOfRows * item.noOfColumns;
    });
    debugger;
    if (passengerCount > totalSeatingCapacity) {
      errorBoundary({
        message:
          "Passenger count is greater than the total available seats. Please change the value",
        isError: true,
      });
    } else {
      const { updateData } = this.props;
      if (updateData) {
        updateData(flightSegments, passengerCount);
      }
    }
  };
  renderSectionInput = (count) => {
    return [...Array(count)].map((item, index) => {
      return (
        <div
          className="section-input d-flex align-items-center mb-3"
          key={index}
        >
          <div className="mr-3">{`Segment ${index + 1}`}</div>
          <input
            type="number"
            className="input-container mr-3"
            placeholder="No. of rows"
            onBlur={(e) => this.onInputBlur(e, index, "row")}
          />
          <input
            type="number"
            className="input-container"
            placeholder="No. of columns"
            onBlur={(e) => this.onInputBlur(e, index, "column")}
          />
        </div>
      );
    });
  };
  render() {
    const { segmentCount, showDataEntry, passengerCount } = this.state;
    return (
      <div className="booking-input-container">
        <div className="d-flex align-items-center">
          <div className="input-text mr-3">{constant.NO_OF_SEGMENTS}</div>
          <input
            type="number"
            className="input-container"
            placeholder="No. of segments"
            value={segmentCount}
            onChange={(e) => this.onCountChange(e, "segment")}
            onBlur={(e) => this.onCountBlur(e, "segment")}
          />
        </div>
        {segmentCount && showDataEntry ? (
          <React.Fragment>
            <div className="my-5">
              <p className="normal-text">{constant.ROW_COLUMN_COUNT}</p>
              {this.renderSectionInput(segmentCount)}
            </div>
            <div className="d-flex align-items-center mb-5">
              <div className="input-text mr-3">{constant.NO_OF_PASSENGERS}</div>
              <input
                type="number"
                className="input-container"
                placeholder="No. of passengers"
                value={passengerCount}
                onChange={(e) => this.onCountChange(e, "passenger")}
                onBlur={(e) => this.onCountBlur(e, "passenger")}
              />
            </div>
            <Button
              className="submit-button"
              onClick={this.onButtonClick}
              disabled={this.isButtonDisabled()}
            >
              {constant.VIEW_CHART}
            </Button>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export { BookingInput };
export default BookingInput;
