import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animate from 'gsap-promise';
import App from '../App';
import Home from '../Home';
import './style.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Seongwoon Hong',
      description: 'Web developer who makes it happen',
      description2: 'Login and leave a comment below'
    };
  }
  componentDidMount = () => {
    this.floatingAnimation();
    animate.set(this.arrowButton, { autoAlpha: 0});
    animate.to(this.arrowButton, 0.1, { autoAlpha: 1, delay: 5});
  }
  random = (min, max) => {
    return (Math.random() * (max - min)) + min;
  }
  floatingAnimation = () => {
    const ref = [...document.querySelectorAll('div.txt')];
    ref.map((txt, i) => {
      animate.from(txt, 4, {
        opacity: 0,
        x: this.random(-500, 500),
        y: this.random(-500, 500),
        z: this.random(-500, 500),
        scale: .1,
        delay: i * .02,
        rotation: `${24*i}deg`,
        ease: SlowMo.ease.config(0.7, 0.7, false) // eslint-disable-line
      })
    })
  }
  getSpanText = (text) => {
    return text.split('').map((txt, i) => {
      return <div className={`txt ${txt}-${i}`} key={i}>{ txt === '' ? '&nbsp': txt}</div>
    });
  }
  arrowScrollDown = () => {
    const offset = document.getElementById('root').offsetHeight;
    animate.to(window, 1, { scrollTo: { y: offset, autoKill: true }});
    this.setState({ isScrolled: true });
  }
  render() {

    return (
      <div id="landing">
        <App />
        <div className="main">
          <div className="main-header">
            <div className="title">{this.getSpanText(this.state.title)}</div>
            <div className="description">{this.getSpanText(this.state.description)}</div>
            <div className="description2">{this.getSpanText(this.state.description2)}</div>
          </div>
        </div>
        <div className="main-arrow-wrapper">
          <i
            className="material-icons arrow-down"
            onClick={this.arrowScrollDown}
            ref={el => this.arrowButton = el}
          >
            arrow_downward
          </i>
        </div>
        <div className="home-wrapper">
          <Home />
        </div>

      </div>
    );
  }
}
Landing.defaultProps = {

};

Landing.propTypes = {

};
export default Landing;
