import React, { useState } from "react";
import { Form, Modal, Input } from "antd";
import ChangePasswordModal from "./ChangePasswordModal";

const ResetPasswordCodeModal = (props) => {
  const resetPasswordObject = props.resetPasswordObject;
  const [form] = Form.useForm();
  const [isChangePasswordModalClicked, setIsChangePasswordModalClicked] =
    useState(false);
  const [error, setError] = useState("");
  const onChangePasswordModalClicked = () => {
    setIsChangePasswordModalClicked(true);
  };
  const onCancel = () => {
    setIsChangePasswordModalClicked(false);
  };
  const handleOk = () => {
    form.validateFields().then((validatedValues) => {
      if (resetPasswordObject.code === validatedValues.resetPasswordCode) {
        props.onCancel();
        onChangePasswordModalClicked();
      } else {
        setError("Please, try again !!!");
      }
    });
  };
  return (
    <div>
      <ChangePasswordModal
        email={resetPasswordObject.email}
        isChangePasswordModalClicked={isChangePasswordModalClicked}
        onCancel={onCancel}
      />
      <Modal
        width={400}
        title="Forgot Password"
        visible={props.isResetPasswordCodeModalClicked}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Reset-Password Code"
            name="resetPasswordCode"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter reset-password code" />
          </Form.Item>
        </Form>
        {error.length > 0 && (
          <span style={{ marginLeft: ".3rem", color: "red" }}>{error} </span>
        )}
      </Modal>
    </div>
  );
};

export default ResetPasswordCodeModal;
