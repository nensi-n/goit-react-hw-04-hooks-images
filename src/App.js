import { Component } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Searchbar from "./components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "./services/api-service";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import LoaderItem from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import ErrorView from "./components/ShowError/ShowError";

class App extends Component {
  state = {
    query: "",
    images: [],
    largeImageURL: "",
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  searchImages = async () => {
    const { query, page } = this.state;

    if (query.trim() === "") {
      return toast.info(" Please enter search query...");
    }

    this.toggleLoader();

    try {
      const request = await apiService(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
      }));
      if (request.length === 0) {
        this.setState({ error: `No results were found for ${query}!` });
      }
      // else {
      //   window.scrollTo({
      //     top: document.documentElement.scrollHeight,
      //     behavior: "smooth",
      //   });
      // }
    } catch (error) {
      this.setState({ error: "Ooops... something went wrong. Try again." });
    } finally {
      this.toggleLoader();
    }
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ images: [], page: 1, error: null });
    this.searchImages();
  };

  onLoadMore = () => {
    this.searchImages();
  };

  onOpenModal = (e) => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, images, largeImageURL, isLoading, showModal, error } =
      this.state;

    return (
      <Container>
        <Searchbar
          onHandleSubmit={this.handleSubmit}
          onSearchQueryChange={this.handleChange}
          value={query}
        />

        {error && <ErrorView texterror={error} />}

        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}

        {isLoading && <LoaderItem />}

        {!isLoading && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}
        <ToastContainer autoClose={3700} />
      </Container>
    );
  }
}

export default App;
