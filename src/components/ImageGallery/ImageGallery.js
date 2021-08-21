import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";

export default class ImageGallery extends Component {
  render() {
    let { gallery, onShowModal } = this.props;
    return (
      <ul className="ImageGallery">
        {gallery.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onShowModal={onShowModal}
          />
        ))}
      </ul>
    );
  }
}
