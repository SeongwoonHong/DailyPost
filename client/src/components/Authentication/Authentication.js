import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './style.css';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  handleLogin = () => {
    let id = this.state.username;
    let pw = this.state.password;
    this.props.onLogin(id, pw).then(
      (success) => {
        if(!success) {
          this.setState({
            password: ''
          });
        }
      }
    );
  }
  handleRegister = () => {
    let id = this.state.username;
    let pw = this.state.password;
    this.props.onRegister(id, pw).then((result) => {
      if (!result) {
        this.setState({
          username: '',
          password: ''
        });
      }
    })
  }
  handleKeyPress = (e) => {
    if (e.charCode == 13) {
      if (this.props.mode) {
        this.handleLogin();
      } else {
        this.handleRegister();
      }
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const inputBoxes = (
        <div>
          <div className="input-field col s12 username">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              id="username"
              onChange={this.handleChange}
              value={this.state.username}
              className="validate"/>
          </div>
          <div className="input-field col s12">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
                className="validate"
                onKeyPress={this.handleKeyPress}
              />
          </div>
        </div>
    );
    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</a>
          </div>
        </div>
        <div className="footer">
          <div className="card-content">
            <div className="right" >
              New Here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <a
            className="waves-effect waves-light btn"
            onClick={this.handleRegister}
          >
            CREATE
          </a>
        </div>
      </div>
    );
    return (
      <div className="container auth">
        <Link className="logo" to="/">MEMOPAD</Link>
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
          </div>
          {this.props.mode ? loginView : registerView }
        </div>
      </div>
    );
  }
}
Authentication.defaultProps = {
  mode: true,
  onLogin: (id, pw) => { console.error("login function not defined"); },
  onRegister: (id, pw) => { console.error("register function not defined"); }
};

Authentication.propTypes = {
  mode: PropTypes.bool,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func
};
export default Authentication;
