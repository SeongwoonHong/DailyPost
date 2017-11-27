import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import TransitionGroup from 'react-transition-group-plus';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Memo from '../Memo/Memo';
import './style.css';
class MemoList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
    return update;
  }
  render() {
    return (
      <div className="memo-list">
        <ReactCSSTransitionGroup
          transitionName="memo"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}
        >
          {
            this.props.data.map((memo, i) => {
              return (<Memo
                data={memo}
                ownership={ (memo.writer === this.props.currentUser)}
                key={memo._id}
                index={i}
                onEdit={this.props.onEdit}
                onRemove={this.props.onRemove}
                onStar={this.props.onStar}
                currentUser={this.props.currentUser}
                animationDelay={ i % this.props.data.length / 4}
              />);
            })
          }
        </ReactCSSTransitionGroup>

      </div>
    );
  }
}
MemoList.defaultProps = {
  data: [],
  currentUser: ''
};

MemoList.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onStar: PropTypes.func,
};
export default MemoList;
