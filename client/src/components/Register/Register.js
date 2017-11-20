import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Authentication from '../Authentication/Authentication';
import { browserHistory } from 'react-router';

class Register extends Component {
  handleRegister = (id, pw) => {
    return this.props.registerRequest(id, pw).then(() => {
      if (this.props.status === 'SUCCESS') {
        // Materialize.toast('Success! Please log in', 2000);
        browserHistory.push('/login');
      } else {
        /*
          ERROR CODES:
            1: BAD USERNAME
            2: BAD PASSWORD
            3: USERNAME EXISTS
        */
        let errorMessage = [
          'Invalid Username',
          'Password is too short',
          'Username already exists'
        ];
        // let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
        // Materialize.toast($toastContent, 2000);
        return false;
      }
    })
  }

  render() {
    return (
      <div>
        <Authentication
          mode={false}
          onRegister={this.handleRegister}
        />
      </div>
    );
  }
}
Register.defaultProps = {

};

Register.propTypes = {

};
export default Register;
