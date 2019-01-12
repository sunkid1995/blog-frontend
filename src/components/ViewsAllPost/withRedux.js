import reduxWrapper from 'next-redux-wrapper';

// Redux
import { serviceApi } from 'src/redux/actions';
import makeStore from 'src/redux/store';

function mapStateToProps(state) {
  const { allPost } = state.serviceApi;
  return { allPost };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: payload => dispatch(serviceApi.getAllPost(payload)),
    createLike: payload => dispatch(serviceApi.createLike(payload)),
    unLike: payload => dispatch(serviceApi.unLike(payload)),
  };
}

export default function withRedux(wrappedComponent) {
  return reduxWrapper(makeStore, mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
