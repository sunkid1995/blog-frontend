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
    allLike: propTypes.object.isRequired,
    createLike: propTypes.func.isRequired,
    index: propTypes.number.isRequired,
    item: propTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      allLike: [],
      check: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { allLike, item } = this.props;
    const { allLike: nextAllLike } = nextProps;
    if (allLike !== nextAllLike) {
      const { data } = nextAllLike;
      if (data !== undefined) this.setState({ allLike: data });

      _.each(data, abc => {
        const { postId: { _id }, like: ahah } = abc;
        const { _id: idPost } = item;
        if (_id === idPost) {
          return this.state.check = ahah;
        }
      });
    }
  }


  actionsLike = payload => {
    const { allLike } = this.state;
    const { checkLike, index, item } = payload;

    if (checkLike === true) this.setState({ check: false });
    else this.setState({ check: true });

    if (allLike[index] !== undefined) {
      // đã like
      const { _id, postId: { _id: PostId }, userId } = allLike[index];
      // console.log(_id, PostId, userId);
    } else {
      // chưa like
      const like = true;
      const { _id: postId, authorId: { _id: userId } } = item;
      this.props.createLike({ postId, userId, like });
    }
  }
  
  render() {
    const { item, index } = this.props;
    const { allLike, check } = this.state;

    const { content, authorId: auth } = item;
    const { username } = auth;

    const getLike = _.reduce(allLike, (result, like) => {
      const { postId: { _id }, userId } = like;
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
                {getLike.length}
              </span>
            </p>
          </CardBody>
          
          <CardFooter className="card-actions">
            <CardActions 
              actionsLike={this.actionsLike} 
              checkLike={check}
              index={index}
              item={item}
            />
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
