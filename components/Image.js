import React from "react";
import NextImage from "next/image";
const Image = (props) => {
  const renderedImage = props.renderedImage;
  return (
    <div className="carousel-slide">
      <div className="image__list">
        <NextImage
          className={
            renderedImage.id == props.counter ? "slide active image" : "slide"
          }
          layout="fill"
          quality={100}
          alt="Qries"
          src={renderedImage.imageBase64}
        ></NextImage>
      </div>
    </div>
  );
};

export default Image;
