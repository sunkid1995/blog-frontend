import React from 'react';
import propTypes from 'prop-types';
import css from 'styled-jsx/css';

// Constants
import { COLOR } from 'src/constants/style-set';

const UploadImage = props => {
  const { resultImg, closeImage } = props;
  return (
    <div>
      {resultImg &&
      <div className="container">
        <img alt="Avatar" className="image" src={resultImg} />
        <div className="middle">
          <div className="text">
            <i className="fas fa-trash-alt" onClick={closeImage} />
          </div>
        </div>
      </div>
      }
      <style jsx>{styles}</style>
    </div>
  );
};

UploadImage.propTypes = {
  closeImage: propTypes.func.isRequired,
  resultImg: propTypes.string,
};

UploadImage.defaultProps = {
  resultImg: '',
};

const styles = css`

.container {
  position: relative;
  width: 50%;
  margin-left: 25px;
}

.image {
  opacity: 1;
  display: block;
  width: 50%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 28%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background-color: ${COLOR.BLUE};
  color: white;
  font-size: 20px;
  padding: 5px 13px;
  border-radius: 0.25rem !important;
  cursor: pointer;
}
`;

export default UploadImage;
