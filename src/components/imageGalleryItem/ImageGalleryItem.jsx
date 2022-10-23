import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import Modal from 'components/modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { image, tags, bigImage } = this.props;
    return (
      <ImageItem>
        <Image src={image} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal
            modalImage={bigImage}
            tags={tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </ImageItem>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
