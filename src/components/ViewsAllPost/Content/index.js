import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';
import { Col, Card, CardTitle, CardImg, CardText, CardBody,CardFooter, CardHeader } from 'reactstrap';

// css
import css from 'styled-jsx/css';

// Constants
import { FONT_SIZE } from 'src/constants/style-set';

// Component
import Avatar from 'src/components/Commons/Avatar';
import CardActions from '../CardActions';
import CardCreateComment from '../CardCreateComment';
import CardGetComment from '../CardGetComment';

export default class Content extends React.Component {
  static propTypes = {
    item: propTypes.object.isRequired,
  }

  componentDidMount() {}
  
  render() {
    const { item } = this.props;
    const { content, authorId: auth } = item;
    const { username } = auth;

    const data = [
      {
        _id: '5bfe64086f16dfaba69aaab6',
        userId: '5bf66cfda14919617f52f475',
        postId: {
          _id: '5bfba3c1bbb3a751ccfbe7a2',
          title: 'Bitcoin sụt giảm thê thảm, các công ty đào tiền mã hóa đua nhau phá sản',
        },
        __v: 0,
        created_at: '2018-11-28T09:39:37.764Z',
        like: 0,
      },
    ];

    const like = _.reduce(data, (result, haha) => {
      const { postId: { _id }, userId } = haha;
      const { _id: idPost } = item;
      if (_id === idPost) {
        result.push(userId);
      }
      return result;
    }, []);

    return (
      <Col sm={{ size: 6, order: 2, offset: 3 }}>
        <Card className="card-content">
          <CardHeader>
            <CardTitle>
              <Avatar size={48} />
              <span>
                <a className="ml-2 card-user-name">
                  {username}
                </a>
              </span>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardText className="content-post">{content}</CardText>
            <CardImg 
              alt="Card image cap" 
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" top width="100%"
            />
            <p className="actions-post mb-0 p-2 pt-1">
              <i className="far fa-heart" />{' '}
              <span>
                {like.length}
              </span>
            </p>
          </CardBody>
          
          <CardFooter className="card-actions">
            <CardActions />
          </CardFooter>

          <CardFooter className="card-comment">
            <CardGetComment />
          </CardFooter>

          <CardFooter className="card-user-create-comment">
            <CardCreateComment />
          </CardFooter>
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
    font-size: ${FONT_SIZE.TITLE};
  }

  :global(.content-post) {
    font-size: ${FONT_SIZE.NORMAL};
  }
`;
