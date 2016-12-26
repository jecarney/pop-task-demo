import React, { Component } from 'react';
// import Styles from './App.css';
// import FBApp from './firebase_app.js'

class LogOut extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     //authentication
  //     // currentUser: null,
  //     // loggedIn: false,
  //     //data
  //     allPopped: {}
  //   };
  // };
  render() {
      return (
        <button className="btn-logout btn" onClick={this.signOut}>Log Out</button>
      );
    }

  // signOut = () => {
  //   FBApp.auth().signOut();
  // }
}
export default LogOut;
