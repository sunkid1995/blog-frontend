import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import { Media } from 'reactstrap';
import css from 'styled-jsx/css';
import moment from 'moment';

// Component
import Avatar from 'src/components/Commons/Avatar';

// Constants
import { FONT_SIZE, COLOR } from 'src/constants/style-set';
import { FORMATSDATE } from 'src/constants';

import CardCreateComment from '../CardCreateComment';
import Control from './Control';

// withConnect
import withConnect from './withConnect';

@withConnect
export default class CardGetComment extends React.Component {
  static propTypes = {
    createComment: propTypes.func.isRequired,
    item: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      userId: props.user._id,
      username: props.user.username,
      arrComment: [],
      postId: null,
    };

    this.createComment = props.createComment.bind(this);
  }

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      const { comments } = item;
      this.setState({ arrComment: comments });
    }
  }

  onChangeInput = event => this.setState({ comment: event.target.value });

  getPostEventClick = postId => this.setState({ postId });

  onSubmitFormInput = event => {
    event.preventDefault();
    const { username, userId, postId, comment } = this.state;
    if (comment !== null && comment !== '') {
      const newItem = { username, userId, postId, comment };

      const arr = { 
        comment: { content: comment, userId, createdAt: moment().format() },
        user: { _id: userId, username },
      };
  
      this.createComment(newItem);

      setTimeout(() => {
        this.setState({ arrComment: [...this.state.arrComment, arr], comment: null });
      }, 100);
    } 
  }

  renderComment = (item, index) => {
    const { comment: { content, _id, createdAt } , user: { username } } = item;

    moment.locale('vi');
    const getTime = moment(createdAt).format(FORMATSDATE.TIME);
    const logDateTime = moment(createdAt).startOf(getTime)
      .fromNow();

    return (
      <React.Fragment key={`comment-${index}`}>
        <Media className="mt-1 wraper-comment">
          <Media href="#" left>
            <Avatar size={35} />
          </Media>
          <Media body className="content-comment ml-2 pt-1" >
            <a className="mb-1 pl-2 p-1 user-name" href="/">{username}</a>
            <span className="mb-1 comment-css">{content}</span>
          </Media>
          <Control index={index} post={_id} />
        </Media>
        <a className="ml-5 log-time">{logDateTime}</a>
      </React.Fragment>
    );
  }

  render() {
    const { item } = this.props;
    const { comment, arrComment } = this.state;

    return (
      <React.Fragment>
        {_.map(arrComment, this.renderComment)}
        <CardCreateComment 
          comment={comment}
          getPostEventClick={this.getPostEventClick}
          item={item}
          onChangeInput={this.onChangeInput}
          onSubmitFormInput={this.onSubmitFormInput}
        />
        <style jsx>{styles}</style>
      </React.Fragment>
    );
  }
}

const styles = css`
  :global(.content-comment) {
    border-radius: 1.25rem !important;
    background: #eff1f3;
    font-size: ${FONT_SIZE.NORMAL};
  }

  :global(.wraper-comment) {
    line-height: 35px;
  }
  
  :global(.user-name) {
    color: ${COLOR.BLUE} !important;
  }

  :global(.user-name:hover) {
    color: ${COLOR.BLUE} !important;
  }

  :global(.log-time) {
    font-size: ${FONT_SIZE.SMALL};
    color: ${COLOR.GRAY} !important;
  }

  :global(.icon-controll) {
    font-size: ${FONT_SIZE.SMALL};
    color: ${COLOR.GRAY} !important;
    cursor: pointer;
  }
  :global(.comment-css) {
    cursor: auto;
  }
`;
