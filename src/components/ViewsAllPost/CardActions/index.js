import React from 'react';
import propTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import css from 'styled-jsx/css';

// Constants
import { FONT_SIZE } from 'src/constants/style-set';

const CardActions = props => {
  const { checkLike, actionsLike, item } = props;

  return (
    <React.Fragment>
      <Row className="row-actions text-center">
        <Col className="wrap-actions" onClick={() => actionsLike({ checkLike, item })}>
          <p className="actions-post mb-0 p-2 pt-1">
            
            {checkLike ?
              <span className="action-like">
                <i className="fas fa-heart" />{' '}
                {'Đã thích'}
              </span>
              :
              <span className="action-un-like">
                <i className="far fa-heart" />{' '}
                {'Thích'}
              </span>
            }
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

CardActions.propTypes = {
  actionsLike: propTypes.func.isRequired,
  checkLike: propTypes.bool.isRequired,
  item: propTypes.object.isRequired,
};

const styles = css`

  :global(.row-actions) {
    cursor: pointer;
  }

  :global(.wrap-actions:hover) {
    background-color: rgba(29, 33, 41, .04);
  }

  .action-like {
    font-size: ${FONT_SIZE.TITLE};
    color: red;
  }

  .action-un-like {
    font-size: ${FONT_SIZE.TITLE};
  }

  .actions-post {
    font-size: ${FONT_SIZE.TITLE};
  }
`;

export default CardActions;

