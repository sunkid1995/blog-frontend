import { connect } from 'react-redux';

// Redux
import { serviceApi } from 'src/redux/actions';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { dataCreatePost } = state.serviceApi;
  return {
    user, dataCreatePost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: payload => dispatch(serviceApi.createPost(payload)),
  };
}

export default function withConnect(wrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
