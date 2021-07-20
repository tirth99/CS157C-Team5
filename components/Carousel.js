import React, { useState, useEffect, useRef } from "react";
import Image from "./Image";
import PropTypes from "prop-types";
import useCarousel from "../hooks/useCarousel";
const Carousel = (props) => {
  const { counter, setCounter, handleNextBtn, handlePreviousBtn } =
    useCarousel(props);
  const images = props.imageList;
  const convertIntoImageObject = (imageArray) => {
    let imageObjects = [];
    imageArray.map((image, index) => {
      imageObjects.push({ imageBase64: image, id: index });
    });
    return imageObjects;
  };
  let imageObjects = convertIntoImageObject(images);
  const [renderedImage, setRenderedImage] = useState(imageObjects[counter]);
  useEffect(() => {
    setRenderedImage(imageObjects[counter]);
  }, [counter]);

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <i
          onClick={handlePreviousBtn}
          className="fas fa-angle-double-left icon-left "
        ></i>
        <i
          onClick={handleNextBtn}
          className="fas fa-angle-double-right icon-right "
          id="nextBtn"
        ></i>
        <Image renderedImage={renderedImage} counter={counter}></Image>
      </div>
    </div>
  );
};
Carousel.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string),
};
export default Carousel;
