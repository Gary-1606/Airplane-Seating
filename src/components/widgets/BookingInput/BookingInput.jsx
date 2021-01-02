import React from "react";

import { CustomDropdown } from "../../molecules";
import { Button } from "../../atoms";
import {
  isEmptyObject,
  isNumber,
  isNonEmptyValue,
  isNonEmptyArray,
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
    segmentArray: null,
    passengerCount: null,
    showDataEntry: false,
  };
  onSegmentValChange = (event, key, list) => {
    event.preventDefault();
    if (!isEmptyObject(list)) {
      const { id = 1, name = "2 segments" } = list;
      const count = name === "2 segments" ? 2 : name === "3 segments" ? 3 : 4;
      this.setState({
        selectedSegment: id,
        segmentCount: count,
        segmentArray: Array(count).fill([]),
      });
    }
  };
  isButtonDisabled = () => {
    const { passengerCount, segmentArray } = this.state;
    if (segmentArray && segmentArray.length) {
      const valSegArray = segmentArray?.filter((item) => {
        return isNonEmptyArray(item);
      });
      if (
        valSegArray.length < segmentArray.length ||
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
            segmentArray: Array(Math.floor(Number(value))).fill([]),
          });
          if(Math.floor(Number(value)) > 0) {
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
          segmentArray: Array(Math.floor(Number(value))).fill([]),
        });
        break;
      default:
        break;
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
      const { segmentArray } = this.state;
      let arrToChange = Array.from(segmentArray[index]);
      switch (type) {
        case "row":
          arrToChange[1] = arrToChange[1] ? arrToChange[1] : 1;
          arrToChange[0] = Math.floor(Number(value));
          segmentArray[index] = arrToChange;
          break;
        case "column":
          arrToChange[0] = arrToChange[0] ? arrToChange[0] : 1;
          arrToChange[1] = Math.floor(Number(value));
          segmentArray[index] = arrToChange;
          break;
        default:
          break;
      }
      this.setState({
        segmentArray: segmentArray,
      });
    }
  };
  onButtonClick = () => {
    const { passengerCount, segmentArray } = this.state;
    let totalSeatingCapacity = 0;
    debugger;
    segmentArray.forEach((item) => {
      totalSeatingCapacity = totalSeatingCapacity + item[0] * item[1];
    });
    if (passengerCount > totalSeatingCapacity) {
      errorBoundary({
        message:
          "Passenger count is greater than the total available seats. Please change the value",
        isError: true,
      });
    } else {
      const { updateData } = this.props;
      if (updateData) {
        updateData(segmentArray, passengerCount);
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
          {/* <CustomDropdown
            options={segments}
            className={"custom-dropdown"}
            placeholder="No. of sections"
            selectedValue={selectedSegment}
            onChange={this.onSegmentValChange}
          /> */}
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
