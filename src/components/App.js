import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Header } from "./widgets/Header";
import { Aside } from "./widgets/Aside";
import { Booking } from "./pages/Booking/Booking";
import "../assets/styles/_app.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div id="toast-message-container" className="hide" />
          <BrowserRouter>
            <Header />
            <div className="main-container">
              <Aside />
              <div className="router-content-container">
                <Switch>
                  <Route path="/" exact component={Booking} />
                  <Route path="/Booking" exact component={Booking} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
