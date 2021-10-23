import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onToggleModal, largeImageURL }) {
  const handleKeyDown = (e) => {
    console.log("pooiu");
    if (e.code === "Escape") {
      onToggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;
