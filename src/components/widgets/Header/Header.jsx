import React from "react";
import { Link } from "react-router-dom";
import { BookMark, Notification, User } from "../../atoms/Icons";
import "./styles.scss";

class Header extends React.Component {
  state = {
    firstName: "Tharun Gary",
    lastName: "Kumar",
  };
  render() {
    const { firstName, lastName } = this.state;
    return (
      <div className="navbar">
        <div className="left">
          <Link to="/" className="logo-link">
            <span className="logo"></span>
          </Link>
        </div>
        <div className="right">
          <span className="bookmark" title={"WatchList"}>
            <BookMark className="Icon" />
          </span>
          <span className="notification" title={"Notification"}>
            <Notification className="Icon" />
          </span>
          <span className="user-section">
            <User
              className="avatar-icon"
              title={firstName + " " + lastName + " is signed in"}
            />
          </span>
        </div>
      </div>
    );
  }
}

export { Header };
export default Header;
