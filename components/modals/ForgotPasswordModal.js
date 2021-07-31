import React, { useState } from "react";
import { Form, Modal, Input } from "antd";
import axios from "axios";
import ApiRoutes from "../../util/APIConfig";
import ResetPasswordCodeModal from "./ResetPasswordCodeModal";

const { SEND_EMAIL_URL } = ApiRoutes;

const ForgotPasswordModal = (props) => {
  const [isResetPasswordCodeModalClicked, setIsResetPasswordCodeModalClicked] =
    useState(false);
  const [resetPasswordObject, setResetPasswordObject] = useState({
    email: "",
    code: "",
  });
  const submitCode = () => {
    setIsResetPasswordCodeModalClicked(true);
  };
  const onCancel = () => {
    setIsResetPasswordCodeModalClicked(false);
  };

  const generateCode = (length) => {
    let result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((validatedValues) => {
      const code = generateCode(6);
      setResetPasswordObject({
        email: validatedValues.email,
        code: code,
      });
      axios
        .post(SEND_EMAIL_URL, { email: validatedValues.email, code: code })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      props.onCancel();
      submitCode();
    });
  };
  return (
    <div>
      <ResetPasswordCodeModal
        resetPasswordObject={resetPasswordObject}
        isResetPasswordCodeModalClicked={isResetPasswordCodeModalClicked}
        onCancel={onCancel}
      />
      <Modal
        width={400}
        title="Forgot Password"
        visible={props.isForgotPassModalClicked}
        onOk={handleOk}
        onCancel={props.onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
