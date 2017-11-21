import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import './style.css';
import Materialize from 'materialize-css';
import $ from 'jquery';

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      value: props.data.contents
    };
  }
  // componentDidUpdate = () => {
  //   console.log($);
  //   $('#dropdown-button-'+this.props.data._id).dropdown({
  //     belowOrigin: true // Displays dropdown below the button
  //   });
  // }
  // componentDidMount = () => {
  //   $('#dropdown-button-'+this.props.data._id).dropdown({
  //     belowOrigin: true // Displays dropdown below the button
  //   });
  // }
  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  handleRemove = () => {
    let id = this.props.data._id;
    let index = this.props.index;
    this.props.onRemove(id, index);
  }
  handleStar = () => {
    if (!this.props.ownership) {
      let id = this.props.data._id;
      let index = this.props.index;
      this.props.onStar(id, index);
    }
  }
  toggleEdit = () => {
    if (this.state.editMode) {
      let id = this.props.data._id;
      let index = this.props.index;
      let contents = this.state.value;
      this.props.onEdit(id, index, contents).then(() => {
        this.setState({
          editMode: !this.state.editMode
        });
      });
    } else {
      this.setState({
        editMode: !this.state.editMode
      })
    }
  }
  render() {
    let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;
    const { data, ownership } = this.props;
    let editedInfo = (
      <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
    );
    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button'
           id={`dropdown-button-${data._id}`}
           data-activates={`dropdown-${data._id}`}>
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
          <li><a onClick={this.toggleEdit}>Edit</a></li>
          <li><a onClick={this.handleRemove}>Remove</a></li>
        </ul>
      </div>
    );
    const editView = (
      <div className="write">
        <div className="card">
          <div className="card-content">
            <textarea
              className="materialize-textarea"
              value={this.state.value}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="card-action">
            <a onClick={this.toggleEdit}>OK</a>
          </div>
        </div>
      </div>
    );
    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
          { this.props.data.is_edited ? editedInfo : undefined }
          { ownership ? dropDownMenu : undefined }
        </div>
        <div className="card-content">
          {data.contents}
        </div>
        <div className="footer">
          <i
            className="material-icons log-footer-icon star icon-button"
            style={starStyle}
            onClick={this.handleStar}
          >
            star
          </i>
          <span className="star-count">{this.props.data.starred.length}</span>
        </div>
      </div>
    );
    return(
      <div className="container memo">
       { this.state.editMode ? editView : memoView }
     </div>
    );
  }
}
Memo.defaultProps = {
  data: {
    _id: 'id1234567890',
    writer: 'Writer',
    contents: 'Contents',
    is_edited: false,
    date: {
        edited: new Date(),
        created: new Date()
    },
    starred: []
  },
  ownership: true
};

Memo.propTypes = {
  data: PropTypes.object,
  ownership: PropTypes.bool,
  onEdit: PropTypes.func,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onStar: PropTypes.func,
  starStatus: PropTypes.object,
  currentUser: PropTypes.string
};
export default Memo;
