import { Card, CardHeader, CardBody, Media } from 'reactstrap';

// Constants
import css from 'styled-jsx/css';
import { FONT_SIZE, COLOR } from 'src/constants/style-set';

// Component
import Avatar from 'src/components/Commons/Avatar';


const TabShowRight = () => (
  <div style={{ position: 'fixed' }}>
    <Card>
      <CardHeader>
        <p className="title-hot">{'Top bài viết hay nhất trong tháng'}</p>
      </CardHeader>
      <CardBody>
        <Media className="wrap-content">
          <Media className="wrap-top-post" href="#">
            <Avatar size={30} />
          </Media>
          <Media body>
            <p className="content-hot">
              {' condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'}
            </p>
          </Media>
        </Media>
      </CardBody>
    </Card>
    <Card className="mt-2">
      <CardHeader>
        <p className="title-hot">{'Tags nổi bật'}</p>
      </CardHeader>
      <CardBody>
        <p className="content-hot">
          {'condimentum'}
        </p>
      </CardBody>
    </Card>
    <style jsx>{styled}</style>
  </div>
 
);

const styled = css`
  :global(.wrap-top-post) {
    margin: auto;
    margin-right: 10px;
  }

  :global(.wrap-content) {
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .title-hot {
    margin-bottom: 0px;
    font-size: ${FONT_SIZE.TITLE};
    color: ${COLOR.BLUE};
  }

  .content-hot {
    margin-bottom: 1px;
    font-size: 14px;
    font-weight: 200;
  }
`;
export default TabShowRight;
