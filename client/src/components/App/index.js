import App from './App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/authentication';

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(actions.getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(actions.logoutRequest());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
