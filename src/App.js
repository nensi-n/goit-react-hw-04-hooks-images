import { useEffect, useState } from "react";
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

function App() {
  const [state, setState] = useState({
    query: "",
    images: [],
    largeImageURL: "",
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
  });

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [state.page]);

  const searchImages = async () => {
    const { query, page } = state;

    if (query.trim() === "") {
      return toast.info(" Please enter search query...");
    }

    toggleLoader();

    try {
      const request = await apiService(query, page);
      setState((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...request],
        page: prevState.page + 1,
      }));
      if (request.length === 0) {
        setState((prevState) => ({
          ...prevState,
          error: `No results were found for ${query}!`,
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: "Ooops... something went wrong. Try again.",
      }));
    } finally {
      toggleLoader();
    }
  };

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, query: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      images: [],
      page: 1,
      error: null,
    }));
    searchImages();
  };

  const onLoadMore = () => {
    searchImages();
  };

  const onOpenModal = (e) => {
    setState((prevState) => ({
      ...prevState,
      largeImageURL: e.target.dataset.source,
    }));
    toggleModal();
  };

  const toggleLoader = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: !prevState.isLoading,
    }));
  };

  const toggleModal = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: !prevState.showModal,
    }));
  };

  const { query, images, largeImageURL, isLoading, showModal, error } = state;

  return (
    <Container>
      <Searchbar
        onHandleSubmit={handleSubmit}
        onSearchQueryChange={handleChange}
        value={query}
      />

      {error && <ErrorView texterror={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {isLoading && <LoaderItem />}

      {!isLoading && images.length > 0 && <Button onLoadMore={onLoadMore} />}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={3700} />
    </Container>
  );
}

export default App;
