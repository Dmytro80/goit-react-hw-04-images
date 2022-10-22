import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, tags }) => {
  return (
    <ImageItem>
      <Image src={image} alt={tags} />
    </ImageItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
