import React from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Label, Button } from 'reactstrap';

// css
import css from 'styled-jsx/css';

// Component
import Avatar from 'src/components/Commons/Avatar';

// Constants
import { COLOR, FONT_SIZE } from 'src/constants/style-set';

export default class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      contentPost: null,
    };
  }
  componentDidMount() {}

  onChangeGetCreatePost = event => this.setState({ contentPost: event.target.value });

  render() {
    const { contentPost } = this.state;

    return (
      <Col sm={{ size: 6, order: 2, offset: 3 }}>
        <Card className="card-create-post">
          <CardHeader>
            <p className="title-create-post">{'Tạo bài viết'}</p>
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Label className="label-avatar" for="create-post" sm={1}>
                <Avatar size={48} />
              </Label>
              <Col sm={11}>
                <Input
                  className="input-create-post" 
                  id="create-post" 
                  name="post" 
                  onChange={this.onChangeGetCreatePost}
                  placeholder="Bạn muốn note gì?"
                  type="textarea"
                  value={contentPost || ''}
                />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button className="float-right" color="success" outline>
              {'Đăng'}
            </Button>
          </CardFooter>
        </Card>
        <style jsx>{styles}</style>
      </Col> 
    );
  }
}
const styles = css`
  :global(.card-create-post) {
    box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
  }

  :global(.title-create-post) {
    margin-bottom: 0;
    color: ${COLOR.BLACK_PALE};
    font-size: ${FONT_SIZE.NORMAL};
    font-weight: 600;
  }

  :global(.input-create-post) {
    min-height: 100px !important;
  }

  @media (max-width: 480px) {

    :global(.label-avatar) {
      display: none;
    }

  }
`;
