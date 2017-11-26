import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import animate from 'gsap-promise';
import './style.css';

class Header extends Component {
  componentDidMount = () => {
    animate.set(this.component, { width: '20%' });
    animate.set([this.login, this.logout, this.searchIcon, this.header].filter(Boolean), { autoAlpha: 0 });
    this.animateIn();
  }
  animateIn = () => {
    animate.to(this.component, 0.7, { width: '100%' });
    animate.to(this.header, 0.5, { autoAlpha: 1, delay: 0.5 });
    animate.to([this.login, this.logout].filter(Boolean), 0.5, { autoAlpha: 1, delay: 0.7 });
  }
  render() {
    const loginButton = (
      <li ref={el => this.login = el}>
        <Link to="/login">
          <i className="material-icons">vpn_key</i>
        </Link>
      </li>
    );

    const logoutButton = (
      <li ref={el => this.logout = el}>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">lock_open</i>
        </a>
      </li>
    );
    return (
      <nav ref={el => this.component = el } className="Header">
        <div className="nav-wrapper blue darken-1">
          <div ref={el => this.header = el}>
            <Link to="/" className="brand-logo center header" >MEMOPAD</Link>
          </div>
          <ul>
            <li ref={el => this.searchIcon = el }><a><i className="material-icons">search</i></a></li>
          </ul>
          <div className="right">
            <ul>
              { this.props.isLoggedIn ? logoutButton : loginButton }
            </ul>
          </div>
        </div>
      </nav>
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
