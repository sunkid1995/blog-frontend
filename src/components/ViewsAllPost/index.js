import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

import css from 'styled-jsx/css';

// Models
import PostModel from 'src/models/PostModel';

// Component
import Loading from 'src/components/Commons/Loading';
import Content from './Content';
import CreatePost from './CreatePost';

// withRedux
import withRedux from './withRedux';

@withRedux
export default class ViewsAllPost extends React.Component {
  static propTypes = {
    allPost: propTypes.shape({
      data: propTypes.arrayOf(propTypes.instanceOf(PostModel)),
    }).isRequired,
    createLike: propTypes.func.isRequired,
    getAllPost: propTypes.func.isRequired,
    unLike: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1, perPage: 10,
    };
    
    this.getAllPost = props.getAllPost.bind(this);
    this.createLike = props.createLike.bind(this);
    this.unLike = props.unLike.bind(this);
  }

  componentDidMount = () => this.requestGetAllPostToAPI()

  componentDidUpdate = (prevProps, prevState) => {
    const { page, perPage } = this.state;
    const { page: prevPage, perPage: prevPerPage } = prevState;
    
    // prevState !== state then call request api
    if (page !== prevPage || perPage !== prevPerPage) this.requestGetAllPostToAPI();
  }

  requestGetAllPostToAPI = () => {
    const { page, perPage } = this.state;

    // get all post
    this.getAllPost({ page, perPage });
  }

  renderContentPost = (item, index) => {
    const props = {
      item, index,
      createLike: this.createLike,
      unLike: this.unLike,
    };

    return (
      <Row className="content mt-2 mb-3" key={`content-${index}`}>
        <Content {...props} />
      </Row>
    );
  }

  render() {
    const { allPost } = this.props;
    const { data, loading } = allPost;

    if (loading) return <Loading loading />;

    return (
      <Container fluid>
        <Row className="wrap-create-post">
          <CreatePost />
        </Row>
        {data !== undefined && _.map(data, this.renderContentPost)}
        <style jsx>{styles}</style>
      </Container>
    );
  }
}

const styles = css`
  :global(.wrap-create-post) {
    margin-top: 70px !important;
  }
`;
