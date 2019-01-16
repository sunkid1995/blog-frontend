import React from 'react';
import propTypes from 'prop-types';
import SAlert from 'react-s-alert';

import PostController from './PostController';

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

  cusumerCard = () => {
    const { dataCreatePost } = this.props;
    const { content, resultImg } = this.state;
    const { loading } = dataCreatePost;
  
    const props = {
      onChangeGetCreatePost: this.onChangeGetCreatePost,
      closeImage: this.closeImage,
      changeFileImage: this.changeFileImage,
      funcCreatePost: this.funcCreatePost,
      content, resultImg, loading,
    };

    return (
      <PostController {...props} />
    );
  }

  render() {
    // console.log(this.props.dataCreatePost, 'dataCreatePost');
    return (
      <React.Fragment>
        {this.cusumerCard()}
      </React.Fragment>
    );
  }
}
