import React from 'react';
import propTypes from 'prop-types';
import { Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Label } from 'reactstrap';
import SAlert from 'react-s-alert';

// css
import css from 'styled-jsx/css';

// Component
import Avatar from 'src/components/Commons/Avatar';
import Button from 'src/components/Commons/Button';

// Constants
import { COLOR, FONT_SIZE } from 'src/constants/style-set';

import UploadImage from './UploadImage';

// withConnect
import withConnect from './withConnect';

@withConnect
export default class CreatePost extends React.Component {
  static propTypes = {
    callbackModal: propTypes.bool,
    closeToggle: propTypes.func.isRequired,
    createPost: propTypes.func.isRequired,
    dataCreatePost: propTypes.object.isRequired,
    height: propTypes.number.isRequired,
    user: propTypes.object.isRequired,
  }

  static defaultProps = {
    callbackModal: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null,
      image: null,
      resultImg: null,
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
    } else {
      this.setState({ content: null, resultImg: null, image: null });
      if (this.props.closeToggle !== undefined) this.props.closeToggle();
    }
  }

  onChangeGetCreatePost = event => this.setState({ content: event.target.value });

  funcCreatePost = () => {
    const { user: { _id } } = this.props;
    const { content, image, title } = this.state;
    this.createPost({ content, image, _id, title });
  }

  changeFileImage = event => {
    const reader = new FileReader();
    reader.onload = () => {
      const resultImg = reader.result;
      this.setState({ resultImg });
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    const files = event.target.files || event.dataTransfer.files;

    if (files) this.setState({ image: files[0] });
  }

  closeImage = () => this.setState({ image: null, resultImg: null });

  renderCreatePost = () => (
    <Col className="card-wrap-create-post" sm={{ size: 6, order: 2, offset: 3 }}>
      {this.cusumerCard()}
      <style jsx>{styles}</style>
    </Col>
  )
   
  cusumerCard = () => {
    const { height, dataCreatePost } = this.props;
    const { content, resultImg } = this.state;
    const { loading } = dataCreatePost;
    console.log(loading, 'loading');
  
    return (
      <Card className="card-create-post">
        <CardHeader>
          <p className="title-create-post">{'Tạo bài viết'}</p>
        </CardHeader>
        <CardBody>
          <FormGroup row>
            <Label className="label-avatar" for="create-post" sm={1}>
              <Avatar size={30} />
            </Label>
            <Col sm={11}>
              <Input
                className="input-create-post" 
                id="create-post" 
                name="post" 
                onChange={this.onChangeGetCreatePost}
                placeholder="Bạn muốn note gì?"
                style={{ height: `${height}px` }}
                type="textarea"
                value={content || ''}
              />
            </Col>
          </FormGroup>
          <UploadImage 
            closeImage={this.closeImage}
            resultImg={resultImg}
          />
        </CardBody>
        <CardFooter>
          <label className="custom-file-upload">
            <input accept="image/*" onChange={this.changeFileImage} type="file" />
            <i className="fas fa-cloud-upload-alt mr-1" />
            <span className="discreption-img">{'Ảnh'}</span>
          </label>

          <Button className="float-right" loading={loading} onClick={this.funcCreatePost}>
            {'Đăng bài'}
          </Button>
        </CardFooter>
        <style jsx>{styles}</style>
      </Card>
    );
  }
   
  render() {
    const { callbackModal } = this.props;

    return (
      <React.Fragment>
        {callbackModal ? this.cusumerCard() : this.renderCreatePost()}
      </React.Fragment>
    );
  }
}
const styles = css`
  :global(.card-create-post) {
    box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
  }

  :global(.card-wrap-create-post) {
    display: none;
  }

  .discreption-img {
    color: ${COLOR.BLACK_PALE};
    font-size: ${FONT_SIZE.NORMAL};
  }

  :global(.title-create-post) {
    margin-bottom: 0;
    color: ${COLOR.BLACK_PALE};
    font-size: ${FONT_SIZE.NORMAL};
    font-weight: 600;
  }

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    border-radius: 1.25rem !important
    border: 1px solid #eff1f3;
    display: inline-block;
    padding: 3px 15px;
    cursor: pointer;
    background: #eff1f3;
  }

  .custom-file-upload:hover {
    background-color: rgba(29, 33, 41, .04);
  }

  @media (max-width: 480px) {

    :global(.label-avatar) {
      display: none;
    }

    :global(.card-wrap-create-post) {
      display: initial;
    }

  }
`;
