import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';

const Avatar = payload => {
  const { src, size } = payload;
  const props = !_.isEmpty(src) ? { src } : { src:'/static/images/placeholder-avatar.png' };

  return (
    <React.Fragment>
      <img {...props} />
      <style jsx>{`
        img {
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
        }
      `}</style>
    </React.Fragment>
  );
};

Avatar.propTypes = {
  size: propTypes.number,
  src: propTypes.string,
};

Avatar.defaultProps = {
  size: 48,
  src: null,
};

export default Avatar;
