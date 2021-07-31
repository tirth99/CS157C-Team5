import React from "react";
import { Modal } from "antd";

const ReservationDetailsModal = (props) => {
  const reservation = props.reservation;
  console.log(reservation)
  return (
    <div>
      {reservation ? (
        <Modal
          title="Reservation Detais"
          style={{ color: "rgb(18, 134, 206)" }}
          width={400}
          visible={props.isReservationDetailsModalClicked}
          onCancel={props.onCancel}
          footer={null}
        >
          <h5 className="total__price">
            Total Price : {reservation.totalPrice}$
          </h5>
          <div className="price__details">
            <ul className="reservation__details">
            <li>
                <span>Date reserved : {reservation.createdAt.slice(0, 10)}</span>
              </li>
              <li>
                <span>Camp name : {reservation.name}</span>
              </li>
              <li>
                <span>Location : {reservation.location}</span>
              </li>
              <li>
                <span>
                  Check-in date : {reservation.startDate.slice(0, 10)}
                </span>
              </li>
              <li>
                <span>Check-out date : {reservation.endDate.slice(0, 10)}</span>
              </li>
              <li>
                <span>Unit type : {reservation.unitType}</span>
              </li>
              <li>
                <span>Adults : {reservation.numOfAdults}</span>
              </li>
              <li>
                <span>Children : {reservation.numOfChildren}</span>
              </li>
            </ul>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ReservationDetailsModal;
