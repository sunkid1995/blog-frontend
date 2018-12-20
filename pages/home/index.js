import React from 'react';
import SAlert from 'react-s-alert';

// Components
import AuthContainer from 'src/components/AuthContainer';
import ViewsAllPost from 'src/components/ViewsAllPost';

// Locals
import withRedux from './withRedux';

@withRedux
export default class Home extends React.PureComponent {
  render() {
    return (
      <AuthContainer>
        <ViewsAllPost />
        <SAlert effect="stackslide" offset={30} stack={{ limit: 1 }} timeout={4000} />
      </AuthContainer>
    );
  }
}
