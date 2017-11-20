import Home from './Home';
import { connect } from 'react-redux';
import * as actions from '../../actions/memo';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.memo.post,
    currentUser: state.authentication.status.currentUser,
    memoData: state.memo.list.data,
    listStatus: state.memo.list.status,
    isLast: state.memo.list.isLast,
    editStatus: state.memo.edit,
    removeStatus: state.memo.remove,
    starStatus: state.memo.star
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(actions.memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(actions.memoListRequest(isInitial, listType, id, username));
    },
    memoEditRequest: (id, index, contents) => {
      return dispatch(actions.memoEditRequest(id, index, contents));
    },
    memoRemoveRequest: (id, index) => {
      return dispatch(actions.memoRemoveRequest(id, index));
    },
    memoStarRequest: (id, index) => {
      return dispatch(actions.memoStarRequest(id, index));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
