import React from "react";
import { Link } from "react-router-dom";

import { NavList } from "../../utils/navList";

class SideMenu extends React.Component {
  state = {
    navItems: [],
    selectedMenu: 1,
  };
  componentDidMount = () => {
    this.setState({
      navItems: [...NavList],
    });
  };
  onMenuItemClick = (index) => {
    this.setState({
      selectedMenu: index,
    });
  };
  render() {
    const { navItems, selectedMenu } = this.state;
    return (
      <div className="menu-items">
        {navItems.length
          ? navItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`${item.link}`}
                  className={selectedMenu === index ? "menu selected" : "menu"}
                  onClick={() => this.onMenuItemClick(index)}
                >
                  <span className="menu-name">{item.name}</span>
                </Link>
              );
            })
          : null}
      </div>
    );
  }
}

export { SideMenu };
export default { SideMenu };
