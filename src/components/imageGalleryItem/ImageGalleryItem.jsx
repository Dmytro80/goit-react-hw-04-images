import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import Modal from 'components/modal/Modal';
import { useCallback } from 'react';

const ImageGalleryItem = ({ image, tags, bigImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

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
