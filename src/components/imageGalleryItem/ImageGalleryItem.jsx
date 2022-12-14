import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import Modal from 'components/modal/Modal';

const ImageGalleryItem = ({ image, tags, bigImage }) => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(prevState => !prevState);
  }

  return (
    <ImageItem>
      <Image src={image} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal modalImage={bigImage} tags={tags} onCloseModal={toggleModal} />
      )}
    </ImageItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
