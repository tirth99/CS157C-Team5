import React from "react";
import { Modal } from "antd";

const SuccessfulModal = (props) => {
  return (
    <div>
      <Modal
        style={{ color: "rgb(18, 134, 206)" }}
        width={370}
        title="Successfull Payment Page"
        visible={props.isSuccessfulPageClicked}
        onCancel={props.onCancel}
        footer={null}
      >
        <div className="successful__page">
          <i className="fas fa-check-circle"></i>
          <h5 style={{ marginTop: "1.5rem" }}>Payment Successful</h5>
          <span>You have successfully reserved the camp</span>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessfulModal;
