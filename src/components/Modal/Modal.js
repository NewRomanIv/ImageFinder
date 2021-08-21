import React, { Component } from "react";

import * as basicLightbox from "basiclightbox";
import "../../../node_modules/basiclightbox/dist/basicLightbox.min.css";

export default class Modal extends Component {
  state = {
    instance: basicLightbox.create(`
	<img src="${this.props.largeImageURL}" width="800" height="600"/>    
`),
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("click", this.handleClick);
  }

  handleKeydown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
      this.state.instance.close();
    }
  };

  handleClick = (event) => {
    if (event.target.nodeName !== "IMG") {
      this.props.onClose();
      this.state.instance.close();
    }
  };

  render() {
    return <>{this.state.instance.show()}</>;
  }
}
