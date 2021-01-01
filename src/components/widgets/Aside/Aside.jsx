import React from "react";
import { Arrow } from "../../atoms/Icons";
import { SideMenu } from "./SideMenu";
import "./styles.scss";
let collapseWidth = 1080;

class Aside extends React.Component {
  state = {
    sidebarCollapsed: false,
  };
  componentDidMount() {
    this.autoCollapse();
    window.addEventListener("resize", this.autoCollapse);
  }
  sideBarToggle = () => {
    this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  };
  autoCollapse = () => {
    if (window.innerWidth <= collapseWidth) {
      this.setState({ sidebarCollapsed: true });
    } else {
      this.setState({ sidebarCollapsed: false });
    }
  };

  render() {
    return (
      <aside
        id="side-bar"
        className={
          this.state.sidebarCollapsed ? "sidebar collapsed" : "sidebar"
        }
      >
        <div onClick={this.sideBarToggle} className="hamburger-menu">
          <Arrow />
        </div>
        <SideMenu collapsed={this.state.sidebarCollapsed} />
      </aside>
    );
  }
}
export default Aside;
export { Aside };
