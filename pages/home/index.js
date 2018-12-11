import React from 'react';

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
      </AuthContainer>
    );
  }
}
