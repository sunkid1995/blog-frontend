import React from 'react';
import { Row, Col } from 'reactstrap';
import css from 'styled-jsx/css';

const CardActions = props => {
  const {} = props;
  return (
    <React.Fragment>
      <Row className="row-actions text-center">
        <Col className="wrap-actions">
          <p className="actions-post mb-0 p-2 pt-1">
            <i className="far fa-heart" />{' '}
            {'Thích'}
          </p>
        </Col>
        <Col className="wrap-actions">
          <p className="actions-post mb-0 p-2 pt-1">
            <i className="far fa-comment-alt" />{' '}
            {'Bình luận'}
          </p>
        </Col>
      </Row>
      <style jsx>{styles}</style>
    </React.Fragment>
  );
};

const styles = css`

  :global(.row-actions) {
    cursor: pointer;
  }

  :global(.wrap-actions:hover) {
    background-color: rgba(29, 33, 41, .04);
  }

  .actions-post {
    // margin-bottom: 0px;
    // padding: 10px;
  }
`;

export default CardActions;

