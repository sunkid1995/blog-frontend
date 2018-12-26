import React from 'react';
import propTypes from 'prop-types';
import { CardTitle, Form, Input } from 'reactstrap';

// Component
import Avatar from 'src/components/Commons/Avatar';

const CardCreateComment = props => {
  const { comment, onSubmitFormInput, onChangeInput, item, getPostEventClick } = props;
  return (
    <React.Fragment>
      <CardTitle className="wraper-card-user-comment">
        <span className="pt-1">
          <Avatar size={35} />
        </span>
        <Form onSubmit={onSubmitFormInput} style={{ width: '100%' }}>
          <Input 
            className="input-comment ml-2" 
            onChange={onChangeInput}
            onClick={() => getPostEventClick(item._id)}
            placeholder="Viết bình luận ..."
            value={comment || ''}
          />
        </Form>
        <style jsx>
          {`
            :global(.wraper-card-user-comment) {
              display: flex;
              margin-top: 10px;
            }
            
            :global(.input-comment) {
              border-radius: 1.25rem !important;
            }
          `}
        </style>
      </CardTitle>
    </React.Fragment>
  );
};

CardCreateComment.propTypes = {
  comment: propTypes.string,
  getPostEventClick: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  onChangeInput: propTypes.func.isRequired,
  onSubmitFormInput: propTypes.func.isRequired,
};

CardCreateComment.defaultProps = {
  comment: '',
};

export default CardCreateComment;
