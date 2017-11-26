import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Authentication from '../Authentication/Authentication';
import { withRouter } from 'react-router-dom';
import Materialize from 'materialize-css';
import TransitionGroup from 'react-transition-group-plus';
import $ from 'jquery';
import './style.scss';

class Register extends Component {
  handleRegister = (id, pw) => {
    return this.props.registerRequest(id, pw).then(() => {
      if (this.props.status === 'SUCCESS') {
        Materialize.toast('<span style="color: teal">Success! Please log in</span>', 2000, 'rounded');
        this.props.history.push('/login');
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
        Materialize.toast('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>', 2000, 'rounded');
        return false;
      }
    })
  }

  render() {
    return (
      <div>
        <TransitionGroup component="div">
          <Authentication
            mode={false}
            onRegister={this.handleRegister}
          />
        </TransitionGroup>
      </div>
    );
  }
}
Register.defaultProps = {

};

Register.propTypes = {

};
export default withRouter(Register);
