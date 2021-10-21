import PropTypes from "prop-types";
import "./ImageGalleryItem.css";

function ImageGalleryItem({ webformatURL, largeImageURL, tags, onOpenModal }) {
  return (
    <li className="item">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className="image"
        onClick={onOpenModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
