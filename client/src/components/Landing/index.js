import Landing from './Landing';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn
  };
}

export default connect(mapStateToProps)(Landing);
