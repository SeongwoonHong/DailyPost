import Register from './Register';
import { connect } from 'react-redux';
import * as actions from '../../actions/authentication';

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw) => {
      return dispatch(actions.registerRequest(id, pw));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
