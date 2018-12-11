import React from 'react';
import { Container, Row } from 'reactstrap';

// Component
import Content from './Content';
import CreatePost from './CreatePost';

export default class ViewsAllPost extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Container fluid>
        <Row className="create-post mt-3">
          <CreatePost />
        </Row>
        <Row className="content mt-2">
          <Content />
        </Row>
      </Container>
    );
  }
}
