import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import animate from 'gsap-promise';
import './style.css';

class Header extends Component {
  componentDidMount = () => {
    animate.from([this.loginButton, this.logoutButton].filter(Boolean), 3, { autoAlpha: 0, delay: 5 });
  }
  render() {
    const loginButton = (
      <Link to="/login">
        <button className="login-button" ref={el => this.loginButton = el}>LOGIN</button>
      </Link>
    );

    const logoutButton = (
      <a onClick={this.props.onLogout}>
        <button className="login-button" ref={el => this.logoutButton = el}>LOGOUT</button>
      </a>
    );
    return (
      <span className="header">
        <span>
          { this.props.isLoggedIn ? logoutButton : loginButton }
        </span>
      </span>

    );
  }
}
Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => console.log('logout function not defined')
};
export default Header;
