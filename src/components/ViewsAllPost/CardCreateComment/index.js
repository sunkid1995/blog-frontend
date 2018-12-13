import React from 'react';
import { CardTitle, Input } from 'reactstrap';

// Component
import Avatar from 'src/components/Commons/Avatar';

const CardCreateComment = props => {
  const { } = props;

  function abc(event) {
    console.log(event.target.value);
  }
  
  return (
    <React.Fragment>
      <CardTitle className="wraper-card-user-comment">
        <span className="pt-1">
          <Avatar size={35} />
        </span>
        <Input className="input-comment ml-2" onChange={abc} placeholder="Viết bình luận ..." />
        <style jsx>
          {`

            :global(.wraper-card-user-comment) {
              display: flex;
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

export default CardCreateComment;
