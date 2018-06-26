import React, { Component } from "react";
import { loginService, getUserDataService } from "../service/index";
import { setItem, getItem } from "../service/storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.checkElementValidity = this.checkElementValidity.bind(this);
    this.login = this.login.bind(this);
  }

  handleInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  checkElementValidity() {}

  login(evt) {
    evt.preventDefault();
    const formBody = { ...this.state };
    loginService(formBody)
      .then(data => {
        console.log(data);
        setItem("user-token", data["user-token"]);
        setItem("userId", data.objectId);
        this.props.history.push(`profile/${data.objectId}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onInput={this.handleInput}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onInput={this.handleInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
