import React from "react";
import PropTypes from "prop-types";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onShowModal,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        data-image={largeImageURL}
        onClick={onShowModal}
      />
    </li>
  );
}

ImageGalleryItem.defaultProps = {
  webformatURL:
    "https://image.freepik.com/free-vector/man-sitting-on-big-question-mark-symbol_24381-1192.jpg",
  largeImageURL:
    "https://image.freepik.com/free-vector/man-sitting-on-big-question-mark-symbol_24381-1192.jpg",
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};
