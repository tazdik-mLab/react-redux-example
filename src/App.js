import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Route, Link, Redirect } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import { getItem, removeItem } from "./service/storage";

const ProtedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/" />;

class App extends Component {
  constructor(props) {
    super(props);
    this.displayProtectedLink = this.displayProtectedLink.bind(this);
    this.logout = this.logout.bind(this);
  }

  displayProtectedLink() {
    if (getItem("user-token")) {
      const id = getItem("userId");
      return (
        <span>
          <li className="nav-item">
            <Link className="nav-link" to={`profile/${id}`}>
              Profile
            </Link>
          </li>
          <li className="nav-item" onClick={this.logout}>
            <a className="nav-link" href="javascript:;">
              Logout
            </a>
          </li>
        </span>
      );
    }
  }

  logout(evt) {
    evt.preventDefault();
    removeItem("user-token");
    removeItem("userId");
    window.location.replace("/");
  }

  render() {
    return (
      <div>
        <ul className="AppNav nav nav-pills justify-content-start">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          {this.displayProtectedLink()}
        </ul>

        <div className="AppContent">
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/signup" component={Signup} />
          <ProtedRoute
            exact={true}
            isAllowed={getItem("user-token")}
            path="/profile/:id"
            component={Profile}
          />
        </div>
      </div>
    );
  }
}

export default App;
