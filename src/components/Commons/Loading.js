// import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';


const Loading = payload => {
  const { loading } = payload;
  return (
    <React.Fragment>
      <p className="text-center mt-5">
        {loading && <MDSpinner size={50} />}
      </p>
    </React.Fragment>
  );
};

Loading.propTypes = {
  loading: propTypes.bool.isRequired,
};

export default Loading;
