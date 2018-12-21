import React from 'react';
import propTypes from 'prop-types';
import css from 'styled-jsx/css';

const UploadImage = props => {
  const { resultImg, closeImage } = props;
  return (
    <div>
      {resultImg &&
      <div className="dialog">
        <a className="close-thik" href="#" onClick={closeImage} />
        <img className="show-image" id="output" id="output" src={resultImg} />
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

  input[type="file"] {
    display: none;
  }

  [class*='close-'] {
    color: white;
    font: 14px/100% arial, sans-serif;
    position: absolute;
    right: 5px;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
    top: 5px;
  }
  
  .close-thik:after {
    content: '✖'; /* UTF-8 symbol */
  }
  
  .dialog {
    left: 45px;
    background: #ddd;
    border: 1px solid #ccc;
    border-radius: 5px;
    float: left;
    height: 200px;
    width: 150px;
    margin: 20px;
    position: relative;
  }

  .show-image {
    height: 200px;
    width: 150px;
  }
`;

export default UploadImage;
