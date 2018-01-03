import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animate from 'gsap-promise';
import TimeAgo from 'react-timeago';
import classnames from 'classnames';
import './style.css';
import Button from '../Button/Button';

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      isDropdownOpend: false,
      value: props.data.contents,
      isExpanded: false,
      showExpandedButton: false
    };
    this.scrollHeight = 0;
    this.expandHeight = 0;
  }
  componentDidMount = () => {
    this.scrollHeight = this.contentRef.scrollHeight;
    this.expandHeight = this.contentRef.offsetHeight;
    if (this.scrollHeight > this.expandHeight)
    this.setState({
      showExpandedButton: true
    });
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.data.contents !== nextProps.data.contents) {
      if (this.scrollHeight > this.expandHeight) {
        this.setState({
          showExpandedButton: true
        });
      } else {
        this.setState({
          showExpandedButton: false
        });
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    let current = {
        props: this.props,
        state: this.state
    };

    let next = {
        props: nextProps,
        state: nextState
    };

    let update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }
  toggleDropdown = () => {
    if (!this.state.isDropdownOpend) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({
      isDropdownOpend: !this.state.isDropdownOpend
    });
  }
  handleOutsideClick = (e) => {
    this.toggleDropdown();
  }
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
    if (this.props.currentUser) {
      if (!this.props.ownership) {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onStar(id, index);
      }
    }
  }
  toggleEdit = () => {
    if (this.state.editMode) {
      let id = this.props.data._id;
      let index = this.props.index;
      let contents = this.state.value;
      this.scrollHeight = this.contentRef.scrollHeight - 20;
      this.props.onEdit(id, index, contents).then(() => {
        this.setState({
          editMode: !this.state.editMode,
          isDropdownOpend: false
        });
      });
    } else {
      this.setState({
        editMode: !this.state.editMode
      })
    }
  }
  animateIn = () => {
    return animate.to(this.component, 0.5, { autoAlpha: 1, y: '0px', delay: this.props.animationDelay });
  }
  animateOut = () => {
    return animate.to(this.component, 0.5 ,{ autoAlpha: 0, y: '-50px' });
  }
  expand = () => {
    // if (!this.state.isExpanded) {
    //   this.contentRef.style.height = '500px';
    // } else {
    //   this.contentRef.style.height = this.height + 'px';
    // }
    // this.setState({ isExpanded: !this.state.isExpanded})
    // this.setState({ isExpanded: !this.state.isExpanded });
    if (!this.state.isExpanded) {
      animate.to(this.contentRef, 1, { height: this.scrollHeight, overflow: 'visible' })
    } else {
      animate.to(this.contentRef, 0.5, { height: this.expandHeight, overflow: 'hidden' });
    }
    this.setState({ isExpanded: !this.state.isExpanded})
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillLeave = (done) => {
    this.animateOut().then(done);
  }
  render() {
    // let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;
    const { data, ownership } = this.props;
    let editedInfo = (
      <span className="edit-date" style={{color: '#AAB5BC'}}> (edited)</span>
    );
    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button'
           onClick={this.toggleDropdown}
        >
          <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul className={classnames('dropdown-content', { isDropdownOpend: this.state.isDropdownOpend })}>
          <li><a onClick={this.toggleEdit}>Edit</a></li>
          <li><a onClick={this.handleRemove}>Remove</a></li>
        </ul>
      </div>
    );
    const editView = (
      <div className="write edit-write">
        <div className="card">
          <div className="info">
            <a className="username">{data.writer}</a> <TimeAgo className="memo-date" date={data.date.created}/>
          </div>
          <div className="card-content" ref={el => this.contentRef = el}>
            <textarea
              className="materialize-textarea"
              value={this.state.value}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="card-action">
            <Button
              onClick={this.toggleEdit}
              text="SAVE"
              className="waves-light btn"
              animateAtDidMount
            />
          </div>
        </div>
      </div>
    );
    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{data.writer}</a> <TimeAgo className="memo-date" date={data.date.created}/>
          { this.props.data.is_edited ? editedInfo : undefined }
          { ownership ? dropDownMenu : undefined }
        </div>
        <div className={classnames('card-content', {'isExpanded': this.state.isExpanded})} ref={el => this.contentRef = el}>
          {data.contents}
          {
            (this.state.showExpandedButton) ? <i onClick={this.expand} className="expand-button material-icons">{this.state.isExpanded ? 'remove' : 'add'}</i> : null
          }
        </div>
        <div className="footer">
          <i
            className={classnames('material-icons log-footer-icon star icon-button', { starred: this.props.data.starred.indexOf(this.props.currentUser) > -1 })}
            // style={starStyle}
            onClick={this.handleStar}
          >
            favorite
          </i>
          <span className="star-count">{this.props.data.starred.length}</span>


        </div>
      </div>
    );
    return(
      <div className="memo" ref={el => this.component = el}>
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
