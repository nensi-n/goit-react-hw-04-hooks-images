import "./Searchbar.css";
import PropTypes from "prop-types";

function Searchbar({ onHandleSubmit, onSearchQueryChange, value }) {
  return (
    <header className="header">
      <form className="form" onSubmit={onHandleSubmit}>
        <button type="submit" className="btn">
          <span className="label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onSearchQueryChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Searchbar;
