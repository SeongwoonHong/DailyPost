import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Materialize from 'materialize-css';
import './style.css';

class App extends Component {
  componentDidMount = () => {
    function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    // if loginData is undefined, do nothing
    if (typeof loginData === 'undefined') return;
    loginData = JSON.parse(atob(loginData));
    // if not logged in, do nothing
    if (!loginData.isLoggedIn) return;
    // page refreshed & has a session in cookie
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(() => {
      // if session is not valid
      if (!this.props.status.valid) {
        // logout the session
        loginData = {
          isLoggedIn: false,
          username: ''
        };
        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        Materialize.toast('<span style="color: #FFB4BA">Your session is expired, please log in again</span>', 4000);
      }
    });
  }
  handleLogout = () => {
    this.props.logoutRequest().then(() => {
      Materialize.toast('Good Bye. See you later!', 6000, 'rounded');

      // empties the session
      let loginData = {
        isLoggedIn: false,
        username: ''
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    })
  }
  render() {
    // let re = /(login|register)/;
    // let isAuth = re.test(this.props.location.pathname);
    return (
      <p className="header-wrapper">
        <Header isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleLogout} />
      </p>
    );
  }
}
export default App;
