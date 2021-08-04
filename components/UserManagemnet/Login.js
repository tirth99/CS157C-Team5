import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { login } from "../../util/actions/securityActions";
import types from "../../util/ActionTypes";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";

const Login = (props) => {
  const { GET_ERRORS } = types;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const security = useSelector((state) => state.security);
  const error = useSelector((state) => state.error);
  const [isForgotPassModalClicked, setIsForgotPassModalClicked] =
    useState(false);
  const onForgotPassword = () => {
    setIsForgotPassModalClicked(true);
  };
  const onCancel = () => {
    setIsForgotPassModalClicked(false);
  };
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  useEffect(() => {
    if (security.validToken) {
      Router.push("/");
    }
    const jwt = localStorage.getItem("jwtToken");
    if (jwt) {
      Router.push("/");
    }
  }, [security.validToken]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(login(values));
    });
  };
  return (
    <>
      <ForgotPasswordModal
        isForgotPassModalClicked={isForgotPassModalClicked}
        onCancel={onCancel}
      />
      <Form
        className="custom-form"
        form={form}
        onFinish={handleSubmit}
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 8 }}
      >
        <p style={{ textAlign: "center", color: "red" }}>
          {error.errors.signInMessage}
        </p>
        <div className="form">
          {error.errors.username && error.errors.password && (
            <p>Invalid username or password</p>
          )}{" "}
        </div>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <div className="security">
            <Button htmlType="submit" type="primary">
              <span>Login </span>
              <i className="fas fa-sign-in-alt"></i>
            </Button>
            <Button onClick={onForgotPassword} style={{ marginLeft: ".5rem" }}>
              Forgot Password?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
