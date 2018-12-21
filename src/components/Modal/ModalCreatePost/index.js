import React from 'react';
import propTypes from 'prop-types';
import { Modal } from 'reactstrap';

// Component
import CreatePost from 'src/components/ViewsAllPost/CreatePost';

export default class ModalCreatePost extends React.Component {
  static propTypes = {
    modalToggle: propTypes.bool.isRequired,
    toggleModalCreatePost: propTypes.func.isRequired,
  }

  componentDidMount() {

  }
  
  render() {
    const { modalToggle, toggleModalCreatePost } = this.props;
    return (
      <div>
        <Modal isOpen={modalToggle} size="lg" toggle={toggleModalCreatePost}>
          <CreatePost callbackModal height={200} />
        </Modal>
      </div>
    );
  }
}
