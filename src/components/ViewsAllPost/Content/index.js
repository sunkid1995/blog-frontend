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


// withConnect
import withConnect from './withConnect';

@withConnect
export default class Content extends React.Component {
  static propTypes = {
    allLike: propTypes.object.isRequired,
    createLike: propTypes.func.isRequired,
    index: propTypes.number.isRequired,
    item: propTypes.object.isRequired,
    unLike: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      allLike: [],
      check: false,
      likebyPost: {},
      getTotalLike: 0,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { allLike } = this.props;
    const { allLike: nextAllLike } = nextProps;
    if (allLike !== nextAllLike) {
      const { data } = nextAllLike;
      if (data !== undefined) this.setState({ allLike: data });
      this.logicCheckLike(data);
    }
  }

  logicCheckLike = data => {
    const { item, user: { _id: userId } } = this.props;

    // check actions like post
    _.each(data, likeItem => {
      const { postId, userId: user } = likeItem;
      if (postId !== null) {
        const { _id } = postId;
        const { _id: idPost } = item;
        if (_id === idPost) {
          const den = _.filter(user, item => item._id === userId);
          if (den.length > 0) this.setState({ check: true });
          else this.setState({ check: false });
        }
      }
    });

    // check total like
    const getLike = _.clone(data);
    _.each(getLike, dataLike => {
      const { postId } = dataLike;
      if (postId !== null) {
        const { _id } = postId;
        return dataLike.postIds = _id;
      }
    });

    const likebyPost = _.groupBy(getLike, 'postIds');
    if (likebyPost[item._id] !== undefined) this.setState({ getTotalLike: likebyPost[item._id][0].totalLike });
    else this.setState({ getTotalLike: 0 });
  }

  actionsLike = payload => {
    const { user: { _id: userId } } = this.props;
    const { allLike } = this.state;
    const { checkLike, item } = payload;

    const { _id: postId } = item;

    if (checkLike === true) {
      const fillterLike = _.filter(allLike, like => {
        const { postId: postIdOfLike } = like;
        if (postIdOfLike !== null) return postIdOfLike._id === postId;
      });

      const totalLike = fillterLike[0].totalLike - 1;
      this.props.unLike({ postId, userId, totalLike });
      this.setState({ check: false, getTotalLike: this.state.getTotalLike - 1 });
    } else {
      const { _id: postId } = item;

      const fillterLike = _.filter(allLike, like => {
        const { postId: postIdOfLike } = like;
        if (postIdOfLike !== null) return postIdOfLike._id === postId;
      });
      
      const totalLike = 1;
      if (fillterLike.length > 0) {
        const totalLike = fillterLike[0].totalLike + 1;
        this.setState({ getTotalLike: this.state.getTotalLike + 1 });
        this.props.createLike({ postId, userId, totalLike });
      } else {
        this.setState({ getTotalLike: totalLike });
        this.props.createLike({ postId, userId, totalLike });
      }
      this.setState({ check: true });
    }
  }
  
  render() {
    const { item } = this.props;
    const { check, getTotalLike } = this.state;

    const { content, authorId: auth } = item;
    const { username } = auth !== null && auth;

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
              {getTotalLike}
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
