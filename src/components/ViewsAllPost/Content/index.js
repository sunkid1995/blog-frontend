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
import CardGetComment from '../CardGetComment';


// withConnect
import withConnect from './withConnect';

@withConnect
export default class Content extends React.Component {
  static propTypes = {
    createLike: propTypes.func.isRequired,
    index: propTypes.number.isRequired,
    item: propTypes.object.isRequired,
    unLike: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      check: false,
      totalLike: props.item.likes.length,
      likes: [],
    };
  }

  componentWillUnmount() {
    console.log('duma');
  }
  componentDidMount() {
    const { item, user: { _id } } = this.props;
    const { likes } = item;

    this.setState({ likes });
    _.each(likes, userLikeId => {
      if (userLikeId === _id) this.setState({ check: true });
    });
  }

  actionsLike = payload => {
    const { user: { _id: userId } } = this.props;
    const { likes } = this.state;
    const { checkLike, item: { _id: postId } } = payload;

    if (checkLike === true) this.localUnlike({ postId, userId, likes });
    else this.localLike({ postId, userId, likes });
  }

  localUnlike = payload => {
    const { postId, userId, likes } = payload;

    const likeLocal = _.filter(likes, like => like !== userId);
    this.setState({ totalLike: likeLocal.length, check: false });
    this.props.unLike({ postId, userId });
  }

  localLike = payload => {
    const { postId, userId, likes } = payload;

    const arr = likes;
    arr.push(userId);
    this.setState({ totalLike: arr.length, check: true });
    this.props.createLike({ postId, userId });
  }
  
  render() {
    const { item } = this.props;
    const { check, totalLike } = this.state;

    const { content, author, image } = item;
    const { username } = author !== null && author;

    return (
      <Col sm={{ size: 6, order: 2, offset: 3 }}>
        <Card className="card-content">
          <CardHeader>
            <CardTitle>
              <Avatar size={48} />
              <a className="ml-2 card-user-name" href="/demo" >
                {username}
              </a>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardText className="content-post">{content}</CardText>
            {image && 
            <CardImg 
              alt="Card image cap" 
              src={`http://localhost:8080/${image}`} top width="100%"
            />
            }
            <p className="actions-post mb-0 p-2 pt-1">
              <i className="far fa-heart" />{' '}
              {totalLike}
            </p>
          </CardBody>
          <CardFooter className="card-actions">
            <CardActions 
              actionsLike={this.actionsLike} 
              checkLike={check}
              item={item}
            />
          </CardFooter>
          <CardFooter className="card-comment">
            <CardGetComment 
              item={item}
            />
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
