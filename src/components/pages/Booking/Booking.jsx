import React from "react";

import { BookingInput } from "../../widgets/BookingInput";
import { ChartLayout } from "../../widgets/ChartLayout";
import { constant } from "../../utils/stringHelper";
import "./styles.scss";

class Booking extends React.Component {
  state = {
    chartData: null,
    showChartLayout: false,
    segmentArray: null,
  };
  updateData = (segmentArray, passengerCount) => {
    const segments = [
      {
        row1: [19, 25, 1],
        row2: [21, 29, 7],
      },
      {
        row1: [2, 26, 27, 3],
        row2: [8, 30, 0, 9],
        row3: [13, 0, 0, 14],
      },
      {
        row1: [4, 5],
        row2: [10, 11],
        row3: [15, 16],
      },
      {
        row1: [6, 28, 29],
        row2: [12, 0, 22],
        row3: [17, 0, 23],
        row4: [18, 0, 24],
      },
    ];
    this.setState({
      segmentArray: segmentArray,
      showChartLayout: true,
      chartData: segments,
    });
  };

  render() {
    const { showChartLayout, chartData, segmentArray } = this.state;
    return (
      <React.Fragment>
        <h2>{constant.BOOKING}</h2>
        <BookingInput updateData={this.updateData} />
        {showChartLayout ? (
          <React.Fragment>
            <ChartLayout chartData={chartData} segmentArray={segmentArray} />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export { Booking };
export default Booking;
