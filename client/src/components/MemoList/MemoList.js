import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group-plus';
import Memo from '../Memo/Memo';

class MemoList extends Component {
  render() {
    return (
      <div>
        <TransitionGroup>
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
        </TransitionGroup>
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
