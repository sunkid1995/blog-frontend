import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';
import { Row,Col, Card, CardTitle, CardImg, CardText, CardBody,CardFooter, CardHeader } from 'reactstrap';
import moment from 'moment';

// css
import css from 'styled-jsx/css';

// Constants
import { FORMATSDATE } from 'src/constants';
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

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

    const { content, author, image, createdAt } = item;
    const { username } = author !== null && author;

    moment.locale('vi');
    const getTime = moment(createdAt).format(FORMATSDATE.TIME);
    const logTime = moment(createdAt).startOf(getTime)
      .fromNow();

    return (
      <Col className="mb-3" sm="12">
        <Card className="card-content">
          <CardHeader>
            <CardTitle className="wrap-title">
              <Avatar size={48} />
              <div className="wrap-info">
                <a className="ml-2 card-user-name" href="/demo" >
                  {username}
                </a>
                <a className="log-time-post ml-2">{logTime}</a>
              </div>
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
            <Row>
              <Col sm={{ size: 6 }}>
                <p className="actions-post mb-0 p-2 pt-1">
                  <i className="far fa-heart" />{' '}
                  {totalLike}
                </p>
              </Col>
              
              <Col sm={{ size: 6 }}>
                {item.comments.length > 0 && 
                <p className="actions-post mb-0 p-2 pt-1 float-right">
                  {`${item.comments.length} Bình luận`}
                </p>
                }
              </Col>
            </Row>
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

  :global(.wrap-title) {
    display: flex;
  }

  :global(.card-user-name) {
    color: ${COLOR.BLUE} !important;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    font-size: ${FONT_SIZE.TITLE};
  }

  :global(.content-post) {
    font-size: ${FONT_SIZE.NORMAL};
  }

  .wrap-info {
    display: grid;

  }

  .log-time-post {
    font-size: ${FONT_SIZE.SMALL};
    color: ${COLOR.GRAY} !important;
    font-weight: 400;
  }
`;
