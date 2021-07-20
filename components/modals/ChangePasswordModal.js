import React, { useState } from "react";
import { Form, Modal, Input } from "antd";
import axios from "axios";
import ApiRoutes from "../../util/APIConfig";
import SuccessfulResetPasswordModal from "./SuccessfulResetPasswordModal";
const { CHANGE_PASSWORD_URL } = ApiRoutes;

const ChangePasswordCodeModal = (props) => {
  const [form] = Form.useForm();
  const [
    isSuccessfulResetPasswordModalClicked,
    setIsSuccessfulResetPasswordModalClicked,
  ] = useState(false);
  const onCancel = () => {
    setIsSuccessfulResetPasswordModalClicked(false);
  };
  const handleOk = () => {
    form.validateFields().then((validatedValues) => {
      validatedValues["email"] = props.email;
      axios
        .post(CHANGE_PASSWORD_URL, validatedValues)
        .then((res) => {
          props.onCancel();
          setIsSuccessfulResetPasswordModalClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div>
      <SuccessfulResetPasswordModal
        isSuccessfulResetPasswordModalClicked={
          isSuccessfulResetPasswordModalClicked
        }
        onCancel={onCancel}
      />
      <Modal
        width={400}
        title="Forgot Password"
        visible={props.isChangePasswordModalClicked}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="password"
            label="password"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              {
                min: 6,
                message: "6 characters at least",
              },
              {
                max: 10,
                message: "10 characters at most",
              },
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            name="confirm"
            label="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Password Confirmation does not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePasswordCodeModal;
