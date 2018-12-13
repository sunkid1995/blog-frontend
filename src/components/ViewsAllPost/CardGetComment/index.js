import React from 'react';
import { Media } from 'reactstrap';

// Component
import Avatar from 'src/components/Commons/Avatar';

// Constants
import { FONT_SIZE } from 'src/constants/style-set';

const CardGetComment = props => {
  const { } = props;
  return (
    <React.Fragment>
      <Media className="mt-1">
        <Media href="#" left>
          <Avatar size={35} />
        </Media>
        <Media body className="content-comment ml-2 pt-1">
          <p className="mb-1 pl-2 p-1">{'Bài viết rất hay'}</p>
        </Media>
      </Media>
      <style jsx>{`
        :global(.content-comment) {
          border-radius: 1.25rem !important;
          background: #eff1f3;
          font-size: ${FONT_SIZE.NORMAL};
        }
      `}</style>
    </React.Fragment>
  );
};

export default CardGetComment;
