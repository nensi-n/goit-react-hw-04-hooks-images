import PropTypes from "prop-types";
import "./Button.css";

function Button({ onLoadMore }) {
  return (
    <button type="button" className="Button" onClick={onLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
