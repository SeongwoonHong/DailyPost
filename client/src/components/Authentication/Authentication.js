import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import animate from 'gsap-promise';
import classnames from 'classnames';
import Materialize from 'materialize-css';
import Button from '../Button/Button';
import './style.css';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  componentDidMount = () => {
    animate.set(this.component, { autoAlpha: 0, y: '-50px' });
    this.animateIn();
  }
  animateIn = () => {
    return animate.to(this.component, 1, { autoAlpha: 1, y: '0px' });
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  handleLogin = () => {
    let id = this.state.username;
    let pw = this.state.password;
    if (!id.trim() || !pw.trim()) {
      Materialize.toast('<span style="color: #FFB4BA">Incorrect username or password</span>', 2000);
      return;
    }
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
    if (!id.trim() || !pw.trim()) {
      Materialize.toast('<span style="color: #FFB4BA">Incorrect username or password</span>', 2000);
      return;
    }
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
    if (e.charCode === 13) {
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
  cancelHandler = () => {
    this.props.cancelHandler();
  }
  render() {
    const inputBoxes = (
        <div>
          <div className="input-field col s12 username">
            <i className={classnames('material-icons prefix')}>account_circle</i>
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
            <i className={classnames('material-icons prefix')}>lock</i>
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
            <Button
              className="waves-light btn"
              onClick={this.handleLogin}
              animateAtDidMount
              text="SUBMIT"
              isLink={false}
            />
          </div>
        </div>
        <div className="footer">
          <div className="card-content">
            <div className="right" >
              New Here? <Link to="/register" className="create-account">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    const registerView = (
      <div className="card-content">
        <div className="row">
          {inputBoxes}
          <Button
            className="waves-light btn"
            onClick={this.handleRegister}
            text="CREATE"
            animateAtDidMount
            isLink={false}
          />
        </div>
      </div>
    );
    return (
      <div className="container auth" ref={el => this.component = el}>
        <div className="card">
          <div className="auth-header blue white-text center">
            <div className="card-content teal">
              {
                !this.props.mode && <i
                  className="material-icons prefix right register-close"
                  onKeyDown={() => {}}
                  onClick={this.cancelHandler}>
                  cancel
                </i>
              }
              {
                this.props.mode ? "LOGIN" : "REGISTER"
              }
            </div>
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
