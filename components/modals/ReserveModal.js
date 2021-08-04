import React, { useState } from "react";
import { Form, Modal, Input, InputNumber } from "antd";
import ApiRoutes from "../../util/APIConfig";
import axios from "axios";
import SuccessfulModal from "./SuccessfulModal";
const jwt = localStorage.getItem("jwtToken");
const { RESERVE_CAMP_URL } = ApiRoutes;

const ReserveModal = (props) => {
  const [isSuccessfulPageClicked, setIsSuccessfulPageClicked] = useState(false);
  const handleClickOnSuccessfulPage = () => {
    setIsSuccessfulPageClicked(true);
  };
  const handleCancelSuccessfulPage = () => {
    setIsSuccessfulPageClicked(false);
  };
  const reserveObject = props.reserveObject;
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((validatedValues) => {
      const reservedCamp = {
        fk_user: props.currentUser.user_id,
        fk_camp: props.campId,
        startDate: reserveObject.startDate,
        endDate: reserveObject.endDate,
        unitType: reserveObject.unitType,
        numOfAdults: reserveObject.numOfAdults,
        numOfChildren: reserveObject.numOfChildren,
        totalPrice: calculateTotalPrice(),
      };
      console.log(reservedCamp);
      axios
        .post(RESERVE_CAMP_URL, reservedCamp, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          handleClickOnSuccessfulPage();
        })
        .catch((err) => {
          console.log(err);
        });
      props.onCancel();
      form.resetFields();
    });
  };
  const calculateDifferenceBetweenTwoDates = (startDate, endDate) => {
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };
  const calculateTotalPriceByDays = (startDate, endDate) => {
    let days = calculateDifferenceBetweenTwoDates(startDate, endDate);
    return days * reserveObject.costADay;
  };
  const calculateTotalPriceByUnitType = (unitType) => {
    switch (unitType) {
      case "Truck Camper":
        return 50;
      case "Van":
        return 40;
      case "Class A Motor Home":
        return 30;
      case "Class C Motor Home":
        return 20;
      default:
        break;
    }
  };
  const calculateTotalPriceByAdults = (numOfAdults) => {
    return numOfAdults * 100;
  };
  const calculateTotalPriceByChildren = (numOfChildren) => {
    return numOfChildren * 50;
  };
  const calculateTotalPrice = () => {
    var totalPrice =
      calculateTotalPriceByDays(
        reserveObject.startDate,
        reserveObject.endDate
      )
    return totalPrice;
  };

  // const calculateTotalPrice = () => {
  //   var totalPrice =
  //     calculateTotalPriceByDays(
  //       reserveObject.startDate,
  //       reserveObject.endDate
  //     ) +
  //     calculateTotalPriceByUnitType(reserveObject.unitType) +
  //     calculateTotalPriceByAdults(reserveObject.numOfAdults) +
  //     calculateTotalPriceByChildren(reserveObject.numOfChildren);
  //   return totalPrice;
  // };


  let stayRange = calculateDifferenceBetweenTwoDates(
    reserveObject.startDate,
    reserveObject.endDate
  );
  return (
    <div>
      <SuccessfulModal
        isSuccessfulPageClicked={isSuccessfulPageClicked}
        onCancel={handleCancelSuccessfulPage}
      />
      <Modal
        width={450}
        title="Reserve a camp"
        visible={props.isReserved}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <h5 className="total__price">Total Price : {calculateTotalPrice()}$</h5>
        <div className="price__details">
          <ul>
            <li>
              <span>
                Stay Range : {stayRange} days
              </span>
            </li>
            <li>
              <span>
                Unit Type : {reserveObject.unitType}
              </span>
            </li>
            <li>
              <span>
                Adults : {reserveObject.numOfAdults}
              </span>
            </li>
            <li>
              <span>
                Children : {reserveObject.numOfChildren}
              </span>
            </li>
          </ul>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Card Owner"
            name="cardOwner"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Card owner name" />
          </Form.Item>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Card number" />
          </Form.Item>

          <Form.Item
            style={{ width: "50%", display: "inline-block" }}
            label="Expiration Month"
            name="month"
            rules={[
              {
                required: true,
                message: "This field must be a number !",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={12}
              placeholder="Exp month"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "50%", display: "inline-block" }}
            label="Expiration Year"
            name="year"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={2010}
              max={2030}
              placeholder="Exp year"
            />
          </Form.Item>
          <Form.Item
            label="CVC Number"
            name="CVC"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (isNaN(value)) {
                    return Promise.reject(
                      new Error("This field must be a number !")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input style={{ width: "120px" }} placeholder="CVV number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReserveModal;
