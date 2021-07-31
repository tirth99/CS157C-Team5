import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import types from "../../util/ActionTypes";
import UpdateCamp from "../modals/UpdateCamp";
import { Space, Input } from "antd";
import { useRouter } from "next/router";

const { Search } = Input;
const {
  GET_ALL_CAMPS_URL,
  DELETE_CAMP_BY_ID_URL,
  GET_CAMP_BY_ID_URL,
  FETCH_CAMPSITES_BY_QUERY,
} = ApiRoutes;

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

const Camps = () => {
  const router = useRouter();
  const { UPDATE_CAMP, DELETE_CAMP } = types;
  const dispatch = useDispatch();
  const camp = useSelector((state) => state.camp);
  const jwt = localStorage.getItem("jwtToken");
  var decoded = jwt_decode(jwt);
  const [camps, setCamps] = useState([]);
  const [isUpdateCampClicked, setIsUpdateCampClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(router.query.q);
  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const onSearch = () => {
    router.push(
      {
        pathname: `/available-campsites/`,
        query: {
          q: searchQuery, // update the query param
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const onCancle = () => {
    setIsUpdateCampClicked(false);
    dispatch({
      type: UPDATE_CAMP,
      payload: {
        updatedCamp: {},
        defaultFileList: [],
      },
    });
  };
  const onUpdate = (e) => {
    setIsUpdateCampClicked(true);
    axios
      .get(GET_CAMP_BY_ID_URL + e.target.value, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        let camp = res.data.fetchedCamp;
        dispatch({
          type: UPDATE_CAMP,
          payload: {
            updatedCamp: {
              _id: camp._id,
              name: camp.name,
              description: camp.description,
              location: camp.location,
              images: camp.images,
              costADay: camp.costADay,
            },
            defaultFileList: camp.images,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(FETCH_CAMPSITES_BY_QUERY + searchQuery, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((response) => {
        setCamps(response.data.fetchedCampSitesByQuery);
      });
  }, [router.query.q]);

  useEffect(() => {
    if (!router.query.q) {
      axios
        .get(GET_ALL_CAMPS_URL, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          setCamps(res.data.camps);
        });
    }
  }, [camp.isAdded, camp.updatedCamp, camp.isDeleted, camp]);

  const slidesToShow = (length) => {
    switch (length) {
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 4;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow(camps.length),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const onDelete = (e) => {
    let isDeletedNewState = camp.isDeleted + 1;
    axios
      .delete(DELETE_CAMP_BY_ID_URL + e.target.value, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_CAMP,
          payload: {
            isDeleted: isDeletedNewState,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ background: "white" }}>
      <div className="not__found">
        <Space direction="vertical">
          <Search
            value={searchQuery}
            onChange={onChange}
            style={{ width: "400px", marginTop: "5rem", marginLeft: "11rem" }}
            placeholder="name or adress"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Space>
      </div>
      <div>
        {camps.length == 0 ? (
          <div className="not__found__text">
            <h3 style={{ color: "red" }}>
              Opps, We can not find any campsite with{" "}
              {"'" + router.query.q + "'"} keyword
            </h3>
          </div>
        ) : (
          <div
            style={{
              padding: "10rem",
              background: "white",
              marginTop: "-6rem",
            }}
          >
            <UpdateCamp
              isUpdateCampClicked={isUpdateCampClicked}
              onUpdateNewCamp={onUpdate}
              onCancel={onCancle}
            />
            <Slider {...settings}>
              {camps.map((camp) => {
                return (
                  <div className="card" key={camp._id}>
                    <div className="inner__card">
                      <div className="skew">
                        <div className="image__container">
                          <Image
                            // layout='fill'
                            width={500}
                            height={400}
                            alt="Qries"
                            src={camp.images[0].imageBase64}
                          ></Image>
                        </div>
                      </div>
                      <div className="card__content">
                        <h5>{camp.name}</h5>
                        <p>{camp.location}</p>
                        {decoded.role === "park-manager" ? (
                          <div className="camp__actions">
                            <button className="book__btn">
                              <Link href={`/camps/${camp._id}`}>
                                <span>Book Now</span>
                              </Link>
                            </button>
                            <button
                              onClick={onUpdate}
                              value={camp._id}
                              className="book__btn"
                            >
                              Update <i className="fas fa-marker"></i>
                            </button>
                            <button
                              onClick={onDelete}
                              value={camp._id}
                              className="book__btn"
                            >
                              Delete <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        ) : (
                          <button className="book__btn">
                            <Link href={`/camps/${camp._id}`}>
                              <span>Book Now</span>
                            </Link>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camps;
