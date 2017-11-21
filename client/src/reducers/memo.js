import * as types from '../actions/keys';
import update from 'react-addons-update';

const initialState = {
  post: {
    status: 'INIT',
    error: -1
  },
  list: {
    status: 'INIT',
    data: [],
    isLast: false
  },
  edit: {
    status: 'INIT',
    error: -1
  },
  remove: {
    status: 'INIT',
    error: -1
  },
  star: {
    status: 'INIT',
    error: -1
  }
};

export default function authentication(state = initialState, action) {
  switch(action.type) {
    case types.MEMO_POST:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'WAITING',
          error: -1
        }
      };
    case types.MEMO_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'SUCCESS'
        }
      };
    case types.MEMO_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: 'FAILURE',
          error: action.error
        }
      }
    case types.MEMO_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'WAITING'
        }
      };
    case types.MEMO_LIST_SUCCESS:
      if (action.isInitial) {
        return update(state, {
          list: {
            status: { $set: 'SUCCESS' },
            data: { $set: action.data },
            isLast: { $set: action.data.length < 6}
          }
        });
      }
      else {
        if(action.listType === 'new') {
          return update(state, {
            list: {
              status: { $set: 'SUCCESS' },
              data: { $unshift: action.data },
            }
          });
        } else {
          return update(state, {
            list: {
              status: { $set: 'SUCCESS' },
              data: { $push: action.data },
              isLast: { $set: action.data.length < 6 }
            }
          });
        }
      }
      // loading older or newer memo
    case types.MEMO_LIST_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'FAILURE'
        }
      };
    case types.MEMO_EDIT:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: 'WAITING',
          error: -1,
          memo: undefined
        }
      };;
    case types.MEMO_EDIT_SUCCESS:
      return update(state, {
        edit: {
          status: { $set: 'SUCCESS' },
        },
        list: {
          data: {
            [action.index]: { $set: action.memo }
          }
        }
      });
    case types.MEMO_EDIT_FAILURE:
      return {
        ...state,
        edit: {
          ...state.edit,
          status: 'FAILURE',
          error: action.error
        }
      };
    case types.MEMO_REMOVE:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.MEMO_REMOVE_SUCCESS:
      return update(state, {
        remove:{
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: { $splice: [[action.index, 1]] }
        }
      });
    case types.MEMO_REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case types.MEMO_STAR:
      return update(state, {
        star: {
          status: { $set: 'WAITING' },
          error: { $set: -1 }
        }
      });
    case types.MEMO_STAR_SUCCESS:
      return update(state, {
        star: {
          status: { $set: 'SUCCESS' }
        },
        list: {
          data: {
            [action.index]: { $set: action.memo }
          }
        }
      });
    case types.MEMO_STAR_FAILURE:
      return update(state, {
        star: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}
