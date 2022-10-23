import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../imageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            image={item.webformatURL}
            tags={item.tags}
            bigImage={item.largeImageURL}
          />
        );
      })}
    </ImageGalleryList>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
