import { Overlay, ModalWrapper } from './Modal.styled';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, modalImage, tags }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWrapper>
        <img src={modalImage} alt={tags} width="800" height="600" />
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
