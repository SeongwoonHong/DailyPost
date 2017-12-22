import React, { Component } from 'react';
import Authentication from '../Authentication/Authentication';
import { withRouter } from 'react-router-dom';
import Materialize from 'materialize-css';

class Login extends Component {
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw)
      .then(() => {
        if (this.props.status === 'SUCCESS') {

          let loginData = {
            isLoggedIn: true,
            username: id
          };

          document.cookie = 'key=' + btoa(JSON.stringify(loginData));

          Materialize.toast('Welcome, ' + id + '!\n try leave a comment!', 6000, 'rounded');
          this.props.history.push('/');
          return true;
        } else {
          Materialize.toast('<span style="color: #FFB4BA">Incorrect username or password</span>', 2000, 'rounded');
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

export default withRouter(Login);
