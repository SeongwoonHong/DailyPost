import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: ''
    };
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
      <div className="container write">
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea"
              value={this.state.contents}
              onChange={this.handleChange}
              placeholder="Write down your memo"></textarea>
          </div>
          <div className="card-action">
            <a onClick={this.handlePost}>POST</a>
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
