import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Materialize from 'materialize-css';
import Authentication from '../Authentication/Authentication';
import { browserHistory } from 'react-router';
import Materialize from 'materialize-css';
import $ from 'jquery';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw)
      .then(() => {
        if (this.props.status === 'SUCCESS') {

          let loginData = {
            isLoggedIn: true,
            username: id
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          Materialize.toast('Welcome, ' + id + '!', 2000);
          // browserHistory.push('/');
          window.location = '/';
          return true;
        } else {
          Materialize.toast('<span style="color: #FFB4BA">Incorrect username or password</span>', 2000);
          return false;
        }
      })
  }

  render() {
    return (
      <div>
        <Authentication
          mode={true}
          onLogin={this.handleLogin}
        />
      </div>
    );
  }
}
Login.defaultProps = {

};

Login.propTypes = {

};
export default Login;
