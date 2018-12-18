import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

function mapDispatchToProps(/* dispatch */) {
  return {

  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
} 
