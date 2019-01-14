import { connect } from 'react-redux';

// Redux
import { serviceApi } from 'src/redux/actions';

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: payload => dispatch(serviceApi.createComment(payload)),
  };
}

export default function withConnect(wrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
