import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";
import pic1 from "../../public/images/pic1.jpg";
import pic2 from "../../public/images/pic2.jpg";
import pic3 from "../../public/images/pic3.jpg";
import pic4 from "../../public/images/pic4.jpg";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

export default class Camps extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div style={{ padding: "10rem", background: "white" }}>
        <Slider {...settings}>
          <div className="card">
            <Image
              width = {500}
              height = {400}
              quality={100}
              alt="Qries"
              src={pic1}
              // src = "data:image/jpeg;base64,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"
            ></Image>
            <div className = "card__content">
            <h5>Camp Hatteras</h5>
          <p>Waves, NC</p>
          <button className="book__btn"> 
              Book Now
          </button>
            </div>
          </div>
          <div className="card">
            <Image
            width = {500}
              height = {400}
              quality={100}
              alt="Qries"
              src={pic2}
            ></Image>
            <div className = "card__content">
            <h5>Northlake Rv Resort</h5>
          <p>Houston, TX</p>
          <button className="book__btn"> 
              Book Now
          </button>
            </div>
          </div>
          <div className="card">
            <Image  
            width = {500}
              height = {400}
              alt="Qries"
              src={pic3}
            ></Image>
             <div className = "card__content">
            <h5>Silver City Rv Resort</h5>
          <p>Minden, NV</p>
          <button className="book__btn"> 
              Book Now
          </button>
            </div>
          </div>
          <div className="card">
            <Image
            // layout='fill'
            width = {500}
              height = {400}
              alt="Qries"
              src={pic4}
            ></Image>
            <div className = "card__content">
            <h5>Stand Rock Campground</h5>
          <p>Wisconsin Dells, WI</p>
          <button className="book__btn"> 
              Book Now
          </button>
            </div>
          </div>
          <div className="card">
            <h3>5</h3>
          </div>
          <div className="card">
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
