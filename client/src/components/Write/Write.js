import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animate from 'gsap-promise';
import Button from '../Button/Button';
import './style.css';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
  }
  componentDidMount = () => {
    animate.set(this.component, { autoAlpha: 0, y: '-50px' });
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  animateIn = () => {
    return animate.to(this.component, 0.6, { autoAlpha: 1, y: '0px' });
  }
  handleChange = (e) => {
    this.setState({
      contents: e.target.value
    })
  }
  handlePost = () => {
    let contents = this.state.contents;
    this.props.onPost(contents).then(() => {
      this.setState({
        contents: ''
      });
    });
  }
  render() {
    return (
      <div className="container write" ref={el => this.component = el}>
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea"
              value={this.state.contents}
              onChange={this.handleChange}
              placeholder="Write down your note!"></textarea>
          </div>
          <div className="card-action">
            <span style={{'float': 'left'}}>User Name: <span className="current-user">{ this.props.currentUser }</span></span>
            <Button
              onClick={this.handlePost}
              text="POST"
              className="btn waves-light"
              animateAtDidMount
            />
          </div>
        </div>
      </div>
    );
  }
}
Write.defaultProps = {
  onPost: (contents) => { console.error('post function not defined'); }
};

Write.propTypes = {
  onPost: React.PropTypes.func
};
export default Write;
