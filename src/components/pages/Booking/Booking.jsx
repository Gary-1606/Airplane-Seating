import React from "react";

import {BookingInput} from "../../widgets/BookingInput";
import { constant } from "../../utils/stringHelper";
import "./styles.scss";

class Booking extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>{constant.BOOKING}</h2>
        <BookingInput />
      </React.Fragment>
    );
  }
}

export { Booking };
export default Booking;
