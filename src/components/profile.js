import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h3>I am Profile no: {this.props.match.params["id"]}</h3>
      </div>
    );
  }
}

export default Profile;
