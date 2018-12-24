import React from 'react';
import { Media } from 'reactstrap';

// Component
import Avatar from 'src/components/Commons/Avatar';

// Constants
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

const CardGetComment = props => {
  const { } = props;
  return (
    <React.Fragment>
      <Media className="mt-1 wraper-comment">
        <Media href="#" left>
          <Avatar size={35} />
        </Media>
        <Media body className="content-comment ml-2 pt-1">
          <a className="mb-1 pl-2 p-1 user-name" href="/">{'sunkid'}</a>
          <span className="mb-1">{'Bài viết rất hay'}</span>
        </Media>
      </Media>
      <style jsx>{`
        :global(.content-comment) {
          border-radius: 1.25rem !important;
          background: #eff1f3;
          font-size: ${FONT_SIZE.NORMAL};
        }
        :global(.wraper-comment) {
          line-height: 35px;
        }
        .user-name {
          color: ${COLOR.BLUE};
        }

        .user-name:hover {
          color: ${COLOR.BLUE};
        }

      `}</style>
    </React.Fragment>
  );
};

export default CardGetComment;
