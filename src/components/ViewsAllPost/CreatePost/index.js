import React from 'react';
import propTypes from 'prop-types';
import { Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Label, Button } from 'reactstrap';
import SAlert from 'react-s-alert';

// css
import css from 'styled-jsx/css';

// Component
import Avatar from 'src/components/Commons/Avatar';

// Constants
import { COLOR, FONT_SIZE } from 'src/constants/style-set';

// withConnect
import withConnect from './withConnect';

@withConnect
export default class CreatePost extends React.Component {
  static propTypes = {
    createPost: propTypes.func.isRequired,
    dataCreatePost: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null,
      images: null,
    };

    this.createPost = props.createPost.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    const { dataCreatePost } = this.props;
    const { dataCreatePost: nextDataCreatePost } = nextProps;
    if (dataCreatePost !== nextDataCreatePost) this.handleCheckErr(nextDataCreatePost);
  }

  handleCheckErr = payload => {
    if (!this.handleCheckErrorRequest(payload)) return; 
  }

  handleCheckErrorRequest = payload => {
    const { error, loading } = payload;

    if (loading) return false;

    if (error !== undefined) {
      const { response: { data } } = error;
      const logs = data[0];
      const { message } = logs;
      return SAlert.error(`Lỗi: ${message}`, { position: 'top-right' });
    } else this.setState({ content: null });
  }

  onChangeGetCreatePost = event => this.setState({ content: event.target.value });

  funcCreatePost = () => {
    const { user: { _id } } = this.props;
    const { content, images, title } = this.state;
    this.createPost({ content, images, _id, title });
  }

  render() {
    const { content } = this.state;

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
                  value={content || ''}
                />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button className="float-right" color="success" onClick={this.funcCreatePost} outline>
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
