import React from "react";

import { BookingInput } from "../../widgets/BookingInput";
import { ChartLayout } from "../../widgets/ChartLayout";
import { constant } from "../../utils/stringHelper";
import "./styles.scss";

class Booking extends React.Component {
  state = {
    chartData: null,
    showChartLayout: false,
    flightSegments: null,
    maxNoOfRows: 0,
  };
  bookTickets = (ticketCount, flightSegments) => {
    for (let i = 1; i <= ticketCount; i++) {
      let ticketBooked = this.bookAisleSeat(i, flightSegments);
      if (!ticketBooked) {
        ticketBooked = this.bookWindowSeat(i, flightSegments);
      }
      if (!ticketBooked) {
        ticketBooked = this.bookCenterSeat(i, flightSegments);
      }
    }
    this.setState({
      chartData: flightSegments,
      showChartLayout: true,
    });
  };
  bookCenterSeat = (ticketNo, flightSegments) => {
    let maxNoOfRows = 0;
    flightSegments.forEach((item, index) => {
      if (maxNoOfRows < item.noOfRows) {
        this.setState({
          maxNoOfRows: item.noOfRows,
        });
        maxNoOfRows = item.noOfRows;
      }
    });
    for (let j = 1; j <= maxNoOfRows; j++) {
      let rowNo = j;
      for (let index = 0; index < flightSegments.length; index++) {
        let segment = flightSegments[index];
        if (segment.noOfCenterSeats === 0) {
          continue;
        }
        if (segment.noOfRows < rowNo) {
          continue;
        }
        for (let i = 1; i < segment[rowNo].length - 1; i++) {
          if (segment[rowNo][i] === 0) {
            segment[rowNo][i] = ticketNo;
            segment.noOfCenterSeats = segment.noOfCenterSeats - 1;
            return true;
          }
        }
      }
    }
    return false;
  };
  bookWindowSeat = (ticketNo, flightSegments) => {
    let maxNoOfRows = 0;
    flightSegments.forEach((item, index) => {
      if (maxNoOfRows < item.noOfRows) {
        this.setState({
          maxNoOfRows: item.noOfRows,
        });
        maxNoOfRows = item.noOfRows;
      }
    });
    for (let j = 1; j <= maxNoOfRows; j++) {
      let rowNo = j;
      for (let index = 0; index < flightSegments.length; index++) {
        let segment = flightSegments[index];
        if (index !== 0 && index !== flightSegments.length - 1) {
          continue;
        }
        if (segment.noOfWindowSeats === 0) {
          continue;
        }
        if (segment.noOfRows < rowNo) {
          continue;
        }
        //let seats = deepCopy(segment.rowNo);
        if (index === 0 && segment[rowNo][0] === 0) {
          segment[rowNo][0] = ticketNo;
          segment.noOfWindowSeats = segment.noOfWindowSeats - 1;
          return true;
        } else if (
          index === flightSegments.length - 1 &&
          segment[rowNo][segment[rowNo].length - 1] === 0
        ) {
          segment[rowNo][segment[rowNo].length - 1] = ticketNo;
          segment.noOfWindowSeats = segment.noOfWindowSeats - 1;
          return true;
        }
      }
    }
    return false;
  };
  bookAisleSeat = (ticketNo, flightSegments) => {
    let maxNoOfRows = 0;
    flightSegments.forEach((item, index) => {
      if (maxNoOfRows < item.noOfRows) {
        this.setState({
          maxNoOfRows: item.noOfRows,
        });
        maxNoOfRows = item.noOfRows;
      }
    });
    for (let j = 1; j <= maxNoOfRows; j++) {
      let rowNo = j;
      for (let index = 0; index < flightSegments.length; index++) {
        let segment = flightSegments[index];
        if (segment.noOfAsileSeats === 0) {
          continue;
        }
        if (segment.noOfRows < rowNo) {
          continue;
        }
        if (index !== 0 && segment[rowNo][0] === 0) {
          segment[rowNo][0] = ticketNo;
          segment.noOfAsileSeats = segment.noOfAsileSeats - 1;
          return true;
        } else if (
          index !== flightSegments.length - 1 &&
          segment[rowNo][segment[rowNo].length - 1] === 0
        ) {
          segment[rowNo][segment[rowNo].length - 1] = ticketNo;
          segment.noOfAsileSeats = segment.noOfAsileSeats - 1;
          return true;
        }
      }
    }
    return false;
  };
  updateData = (flightSegments, passengerCount) => {
    const newFlightSegments = Array.from(flightSegments);
    newFlightSegments.map((segment, index) => {
      segment.totalNoOfSeats = segment.noOfRows * segment.noOfColumns;
      segment.noOfAsileSeats =
        index === 0 || index === newFlightSegments.length - 1
          ? segment.noOfRows
          : 2 * segment.noOfRows;
      segment.noOfWindowSeats =
        index === 0 || index === newFlightSegments.length - 1
          ? segment.noOfRows
          : 0;
      segment.noOfCenterSeats =
        segment.totalNoOfSeats -
        (segment.noOfAsileSeats + segment.noOfWindowSeats);
      segment.isFirst = index === 0 ? true : false;
      segment.isLast = index === newFlightSegments.length - 1 ? true : false;
      for (let i = 1; i <= segment.noOfRows; i++) {
        segment[i] = Array(segment.noOfColumns).fill(0);
      }
    });
    flightSegments = [...newFlightSegments];
    this.setState({
      flightSegments,
    });
    this.bookTickets(passengerCount, flightSegments);
  };
  hideChartLayout = () => {
    this.setState({
      showChartLayout: false,
    });
  };
  render() {
    const { showChartLayout, chartData, flightSegments } = this.state;
    return (
      <React.Fragment>
        <h2>{constant.BOOKING}</h2>
        <BookingInput
          updateData={this.updateData}
          hideChartLayout={this.hideChartLayout}
        />
        {showChartLayout ? (
          <React.Fragment>
            <ChartLayout
              chartData={chartData}
              flightSegments={flightSegments}
            />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export { Booking };
export default Booking;
