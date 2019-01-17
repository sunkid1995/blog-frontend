import React from 'react';
import propTypes from 'prop-types';
import css from 'styled-jsx/css';
import { Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Label, Input, Form } from 'reactstrap';

// Component
import Avatar from 'src/components/Commons/Avatar';
import Button from 'src/components/Commons/Button';

// Constants
import { COLOR, FONT_SIZE } from 'src/constants/style-set';

import UploadImage from '../UploadImage';

export default class PostController extends React.Component {
  static propTypes = {
    changeFileImage: propTypes.func.isRequired,
    closeImage: propTypes.func.isRequired,
    content: propTypes.string,
    funcCreatePost: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    onChangeGetCreatePost: propTypes.func.isRequired,
    resultImg: propTypes.string,
  }

  static defaultProps = {
    content: '',
    resultImg: '',
  }

  componentWillReceiveProps = nextProps => {
    const { loading } = this.props;
    const { loading: nextLoading } = nextProps;
    if (loading !== nextLoading) if (nextLoading === true) this.closeOverlay('overlay');
  }

   openOverlay = () => {
     document.getElementById('overlay').style.display = 'block';
     document.getElementById('create-post').style.height = '150px';
   }

   closeOverlay = event => {
     if (event === 'overlay') return document.getElementById('overlay').style.display = 'none';
     if (event.target.id !== undefined && event.target.id !== '') {
       if (event.target.id === 'overlay') document.getElementById('overlay').style.display = 'none';
     }
   }

   render() {
     const { content, onChangeGetCreatePost, closeImage , resultImg, changeFileImage, loading, funcCreatePost } = this.props;
     return (
       <Col sm="12">
         <Card className="show-form-create-post">
           <CardHeader>{'Tạo bài viết'}</CardHeader>
           <CardBody>
             <Form>
               <Input 
                 onChange={onChangeGetCreatePost}
                 onClick={() => this.openOverlay()} 
                 placeholder="Bạn đang nghĩ gì ?" type="textarea"
                 value={content || ''}
               />
             </Form>
           </CardBody>
         </Card>
         <div id="overlay" onClick={event => this.closeOverlay(event)}>
           <Col className="detail-create-post" sm={{ size: 5, order: 2, offset: 3 }}>
             <Card className="card-create-post" >
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
                       onChange={onChangeGetCreatePost}
                       placeholder="Bạn muốn note gì?"
                       type="textarea"
                       value={content || ''}
                     />
                   </Col>
                 </FormGroup>
                 <UploadImage 
                   closeImage={closeImage}
                   resultImg={resultImg}
                 />
               </CardBody>
               <CardFooter>
                 <label className="custom-file-upload">
                   <input accept="image/*" onChange={changeFileImage} type="file" />
                   <i className="fas fa-cloud-upload-alt mr-1" />
                   <span className="discreption-img">{'Ảnh'}</span>
                 </label>
                 <Button className="float-right" loading={loading} onClick={funcCreatePost}>
                   {'Đăng bài'}
                 </Button>
               </CardFooter>
             </Card>
           </Col>
         </div>
         <style jsx>{styles}</style>
       </Col>
     );
   }
}

const styles = css`
  :global(#overlay) {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(113, 110, 110, 0.5);
    z-index: 2;
    transition: opacity .3s, bottom 0s .3s;
  }

  :global(.card-create-post) {
    box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
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

  :global(.detail-create-post) {
    margin-top: 70px;
  }

  :global(.show-form-create-post) {
    box-shadow: rgba(0,0,0,0.3) 0px 5px 30px 0px;
  }

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    border-radius: 1.25rem !important;
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
