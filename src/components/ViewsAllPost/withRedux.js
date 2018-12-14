import reduxWrapper from 'next-redux-wrapper';

// Redux
import { serviceApi } from 'src/redux/actions';
import makeStore from 'src/redux/store';

function mapStateToProps(state) {
  const { allPost, allLike } = state.serviceApi;
  return { allPost, allLike };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: payload => dispatch(serviceApi.getAllPost(payload)),
    getAllLike: payload => dispatch(serviceApi.getAllLike(payload)),
  };
}

export default function withRedux(wrappedComponent) {
  return reduxWrapper(makeStore, mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
