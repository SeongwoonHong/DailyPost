import * as types from '../actions/keys';
import authentication from './authentication';
import memo from './memo';
import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  memo
});
