import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../../actions/memo';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn
  };
}

export default connect(mapStateToProps)(Landing);
