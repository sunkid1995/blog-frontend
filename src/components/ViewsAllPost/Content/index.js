import React from 'react';
import propTypes from 'prop-types';
import { Col, Card, CardTitle, CardImg, CardText } from 'reactstrap';

// css
import css from 'styled-jsx/css';

// Component
import Avatar from 'src/components/Commons/Avatar';

export default class Content extends React.Component {
  static propTypes = {
    item: propTypes.object.isRequired,
  }

  componentDidMount() {}
  
  render() {
    const { item } = this.props;
    const { content, authorId: auth } = item;
    const { username } = auth;
    return (
      <Col sm={{ size: 6, order: 2, offset: 3 }}>
        <Card body className="card-content">
          <CardTitle>
            <Avatar size={48} />
            <span>
              <a className="ml-2 card-user-name">
                {username}
              </a>
            </span>
          </CardTitle>
          <CardText className="content-post">{content}</CardText>
          <CardImg alt="Card image cap" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" top width="100%" />
        </Card>
        <style jsx>{styles}</style>
      </Col>
    );
  }
}

const styles = css`
  :global(.card-content) {
    box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
  }

  :global(.card-user-name) {
    color: #365899 !important;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
  }
`;
