import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import animate from 'gsap-promise';
import { Link } from 'react-router-dom';

class Button extends Component {
  componentDidMount = () => {
    if (this.props.animateAtDidMount) {
      const animateText = [...this.component.querySelectorAll('.animate-text')];
      animate.from(this.component, 0.5, { width: '40%' });
      animate.set(animateText, { autoAlpha: 0 }).then(() => {
        animate.staggerTo(animateText, 1, { autoAlpha: 1, delay: this.props.delay }, 0.05);
      });
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.text !== nextProps.text) {
      return this.animateIn();
    }
    return 0;
  }
  onMouseEnterHandler = () => {
    animate.to(this.component, 0.2, { scale: 1.1 })
      .then(() => animate.to(this.component, 0.2, { scale: 0.9 }))
      .then(() => animate.to(this.component, 0.1, { scale: 1 }));
  }
  onMouseLeaveHandler = () => {
    animate.to(this.component, 0.5, { scale: 1 });
  }
  getSpanText = (text) => {
    return text.split('').map((txt, i) => {
      return (
        <span
          key={`${txt}-${i}`}
          className={`animate-text txt-${i}`}
        >
          { txt }
        </span>
      );
    });
  }
  animateIn = () => {
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    return animate.staggerFrom(animateText, 0.05, { autoAlpha: 0 }, 0.01);
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  renderButtonWithLink = () => {
    return (
      <Link to={this.props.to} style={{ marginRight: '1%', ...this.props.style }}>
        <button
          id={this.props.id}
          className={classnames(this.props.className)}
          type={this.props.type}
          name={this.props.name}
          disabled={this.props.disabled}
          tabIndex={this.props.tabIndex}
          role={this.props.role}
          onKeyDown={this.props.onKeyDown}
          onClick={this.props.onClick}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onMouseLeaveHandler}
          ref={el => this.component = el}
        >
          { this.getSpanText(this.props.text) }
        </button>
      </Link>
    );
  }
  renderButton = () => {
    return (
      <button
        id={this.props.id}
        className={classnames(this.props.className)}
        type={this.props.type}
        name={this.props.name}
        disabled={this.props.disabled}
        tabIndex={this.props.tabIndex}
        role={this.props.role}
        onKeyDown={this.props.onKeyDown}
        onClick={this.props.onClick}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        ref={el => this.component = el}
        style={this.props.style}
        >
        { this.getSpanText(this.props.text) }
      </button>
    );
  }
  render() {
    return (
      this.props.isLink ? this.renderButtonWithLink() : this.renderButton()
    );
  }
}
Button.defaultProps = {
  id: 'default',
  text: '',
  type: '',
  name: '',
  disabled: false,
  ariaLabel: '',
  tabIndex: -1,
  role: '',
  delay: 0,
  to: '/#',
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onKeyDown: () => {},
  animateAtDidMount: true,
  isLink: true
};

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  ariaLabel: PropTypes.string,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  delay: PropTypes.number,
  to: PropTypes.string,
  animateAtDidMount: PropTypes.bool,
  isLink: PropTypes.bool
};
export default Button;
