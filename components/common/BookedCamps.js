import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import ReservationDetailsModal from "../modals/ReservationDetailsModal";
import { SamplePrevArrow, SampleNextArrow } from "./Camps";

const { GET_BOOKED_CAMPS_URL } = ApiRoutes;

const BookedCamps = () => {
  const jwt = localStorage.getItem("jwtToken");
  const [bookedCamps, setBookedCamps] = useState([]);
  const [
    isReservationDetailsModalClicked,
    setIsReservationDetailsModalClicked,
  ] = useState(false);
  const [reservation, setReservation] = useState();

  const onClick = (e) => {
    bookedCamps.map((bookedCamp) => {
      if (bookedCamp._id === e.target.value) {
        setReservation(bookedCamp);
      }
    });
    setIsReservationDetailsModalClicked(true);
  };
  const onCancel = () => {
    setIsReservationDetailsModalClicked(false);
  };
  useEffect(() => {
    axios
      .get(GET_BOOKED_CAMPS_URL, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        setBookedCamps(res.data.bookedCamps);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const slidesToShow = (length) => {
    switch (length) {
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 3;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow(bookedCamps.length),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div style={{ background: "white" }}>
      {bookedCamps.length == 0 ? (
        <h1 className="reserved__campsites_not_exists">
          You have not reserved any campsite yet !!!
        </h1>
      ) : (
        <div>
          <h4
            style={{
              marginLeft: "11rem",
              marginTop: "4rem",
              color: "rgb(18, 134, 206)",
            }}
          >
            The followings are the campsites that you have reserved. Thanks for
            your using our services
          </h4>
          <ReservationDetailsModal
            reservation={reservation}
            isReservationDetailsModalClicked={isReservationDetailsModalClicked}
            onCancel={onCancel}
          />
          <div
            style={{
              padding: "10rem",
              background: "white",
              marginTop: "-6rem",
            }}
          >
            <Slider {...settings}>
              {bookedCamps.map((bookedCamp) => {
                return (
                  <div
                    className="card view__details__card "
                    key={bookedCamp._id}
                  >
                    <div className="inner__card">
                      <div className="skew">
                        <div className="image__container">
                          <Image
                            // layout='fill'
                            width={500}
                            height={420}
                            alt="Qries"
                            src={bookedCamp.image}
                          ></Image>
                        </div>
                      </div>
                      <div
                        style={{ marginTop: ".5rem" }}
                        className="card__content"
                      >
                        <h5>{bookedCamp.name + "  "}</h5>
                        <p>{bookedCamp.location}</p>
                        <p style={{ marginTop: "-10px" }}>
                          Total: {bookedCamp.totalPrice}$
                        </p>
                        <button
                          value={bookedCamp._id}
                          onClick={onClick}
                          style={{ marginTop: "-10px" }}
                          className="book__btn"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedCamps;