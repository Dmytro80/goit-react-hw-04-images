import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onButtonClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onButtonClick}>
      Load more
    </LoadMoreBtn>
  );
};

export default Button;

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
