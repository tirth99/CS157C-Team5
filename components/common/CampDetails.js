import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import { DatePicker, Space, Select } from "antd";
import moment from "moment";
import Slider from "react-slick";
import { SamplePrevArrow, SampleNextArrow } from "./Camps";
import Carousel from "../Carousel";
import ReserveModal from "../modals/ReserveModal";
import jwt_decode from "jwt-decode";

const RangePicker = (props) => {
  const jwt = localStorage.getItem("jwtToken");
  var decoded = jwt_decode(jwt);
  const [reserveObject, setReserveObject] = useState({
    startDate: "",
    endDate: "",
    unitType: "",
    numOfAdults: 0,
    numOfChildren: 0,
    costADay: props.costADay,
  });
  const router = useRouter();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [isReserved, setIsReserved] = useState(false);
  const onReserve = () => {
    if (
      reserveObject.reserveObject !== "" &&
      reserveObject.endDate !== "" &&
      reserveObject.unitType !== "" &&
      reserveObject.numOfAdults > 0
    ) {
      setIsReserved(true);
    }
  };
  const onCancel = () => {
    setIsReserved(false);
  };

  function onChange(dates, dateStrings) {
    if (dateStrings) {
      setReserveObject({
        ...reserveObject,
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      });
    }
  }

  function onNumOfChildrentSelectionChange(value) {
    setReserveObject({
      ...reserveObject,
      numOfChildren: value,
    });
  }
  function onNumOfAdultsSelectionChange(value) {
    setReserveObject({
      ...reserveObject,
      numOfAdults: value,
    });
  }
  function onUnitTypeSelectionChange(value) {
    setReserveObject({ ...reserveObject, unitType: value });
  }

  const numberOfPeopleGenerator = () => {
    let array = [];
    for (let i = 1; i <= 5; i++) {
      array.push(<Option value={i}>{i}</Option>);
    }
    return array;
  };
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  return (
    <div className="ticket__form">
      <div className="inner__ticket__form">
        <div>
          <h6>Stay Range</h6>
          <Space direction="vertical" size={12}>
            <RangePicker disabledDate={disabledDate} onChange={onChange} />
            <ReserveModal
              campId={router.query.id}
              currentUser={decoded}
              reserveObject={reserveObject}
              isReserved={isReserved}
              onReserve={onReserve}
              onCancel={onCancel}
            />
          </Space>
        </div>
        <div>
          <h6>Unit Type</h6>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a unit type"
            optionFilterProp="children"
            onChange={onUnitTypeSelectionChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Truck Camper">Truck Camper</Option>
            <Option value="Van">Van</Option>
            <Option value="Class A Motor Home">Class A Motor Home</Option>
            <Option value="Class C Motor Home">Class C Motor Home</Option>
          </Select>
        </div>
        <div>
          <h6>How many adults?</h6>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a number"
            optionFilterProp="adults"
            onChange={onNumOfAdultsSelectionChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {numberOfPeopleGenerator()}
          </Select>
        </div>
        <div>
          <h6>How many children?</h6>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a number"
            optionFilterProp="children"
            onChange={onNumOfChildrentSelectionChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {numberOfPeopleGenerator()}
          </Select>
        </div>
        <button className="show__avai__btn" onClick={onReserve}>
          {" "}
          Reserve{" "}
        </button>
      </div>
    </div>
  );
};

const IdNotFound = () => {
  return (
    <div className="camp__not__found">
      <h1>Camp Not Fund</h1>
    </div>
  );
};

const extractImageListFromCampObject = (camp) => {
  var imageList = [];
  camp.images.map((image) => {
    imageList.push(image.imageBase64);
  });
  return imageList;
};

const CampDetails = () => {
  const jwt = localStorage.getItem("jwtToken");
  const [camp, setCamp] = useState();
  const { GET_CAMP_BY_ID_URL } = ApiRoutes;
  const router = useRouter();
  useEffect(() => {
    axios
      .get(GET_CAMP_BY_ID_URL + router.query.id, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((response) => {
        const camp = response.data.fetchedCamp;
        setCamp({
          _id: camp._id,
          name: camp.name,
          location: camp.location,
          description: camp.description,
          images: extractImageListFromCampObject(camp),
          costADay: camp.costADay,
        });
      })
      .catch((err) => {
        return;
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ background: "white" }}>
      {typeof camp !== "undefined" ? (
        <div className="camp__details__container">
          <div className="camp__info">
            <h2 style={{ color: "rgb(21, 155, 238)" }}>
              {camp.name + " ("} {camp.location + "),"}{" "}
              {camp.costADay + "$/day"}
            </h2>
            <div className="camp__description">
              <span>{camp.description}</span>
            </div>
          </div>
          <div className="main__camp__container">
            <div id="left">
              <RangePicker costADay={camp.costADay} />
            </div>
            <div id="right">
              <Slider {...settings}>
                <Carousel imageList={camp.images}></Carousel>
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        <IdNotFound />
      )}
    </div>
  );
};

export default CampDetails;