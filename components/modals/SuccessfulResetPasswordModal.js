import React from "react";
import { Modal } from "antd";

const SuccessfulResetPasswordModal = (props) => {
  return (
    <div>
      <Modal
        style={{ color: "rgb(18, 134, 206)" }}
        width={400}
        title="Successfull Reset Password Page"
        visible={props.isSuccessfulResetPasswordModalClicked}
        onCancel={props.onCancel}
        footer={null}
      >
        <div className="successful__page">
          <i className="fas fa-check-circle"></i>
          <h6 style={{ marginTop: "1.5rem" }}>
            You have successfully reset your password
          </h6>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessfulResetPasswordModal;
