import Login from './Login';
import { connect } from 'react-redux';
import * as actions from '../../actions/authentication';

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(actions.loginRequest(id, pw));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
