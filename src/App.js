import React, { Component } from "react";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Spinner from "./components/Spinner/Spinner";
import Notification from "./components/Notification/Notification";
import Modal from "./components/Modal/Modal";
import pixabayAPI from "./services/pixabayAPI";

export default class App extends Component {
  state = {
    gallery: [],
    queryString: { q: "", image_type: "all", per_page: 12, page: 1 },
    error: false,
    loading: false,
    largeImageURL: "",
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.gallery !== this.state.gallery ||
  //     nextState.queryString !== this.state.queryString
  //   );
  // }

  componentDidMount() {
    this.fetchQuery();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.queryString !== this.state.queryString) this.fetchQuery();
    this.scroll();
  }

  fetchQuery = () => {
    this.setState({ loading: true });
    let { queryString } = this.state;
    pixabayAPI
      .fetchGalleryImages(queryString)
      .then(({ hits }) =>
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...hits],
        }))
      )
      .catch((error) => {
        console.log(error);
        return this.setState({ error: error });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleChangeQuery = (searchQuery) => {
    this.setState((prevState) => ({
      gallery: [],
      queryString: { ...prevState.queryString, q: searchQuery, page: 1 },
    }));
  };

  loadMore = () => {
    this.setState((prevState) => ({
      queryString: {
        ...prevState.queryString,
        page: prevState.queryString.page + 1,
      },
    }));
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  closeModal = () => {
    this.setState({ largeImageURL: "" });
  };

  showModal = (event) => {
    this.setState({
      largeImageURL: event.target.dataset.image,
    });
  };

  render() {
    let { gallery, error, loading, largeImageURL } = this.state;
    // console.log(this.state);
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleChangeQuery} />
        {error && <Notification message={error.message} />}
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onShowModal={this.showModal} />
        )}
        {loading && <Spinner />}
        {gallery.length > 0 && <Button onLoadMore={this.loadMore} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
