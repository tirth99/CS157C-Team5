import { Form, Input, Button, DatePicker } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccount } from "../../util/actions/securityActions";
import Router from "next/router";

const UserSignUp = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const security = useSelector((state) => state.security);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    if (security.validToken) {
      Router.push("/");
    }
    const jwt = localStorage.getItem("jwtToken");
    if (jwt) {
      Router.push("/");
    }
  }, [security.validToken]);

  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      values["dob"] = values["dob"] ? values["dob"].format("YYYY-MM-DD") : "";
      dispatch(createUserAccount(values));
    });
  };

  return (
    <Form
      className="custom-form"
      form={form}
      onFinish={handleSubmit}
      wrapperCol={{ span: 8 }}
      labelCol={{ span: 8 }}
    >
      <p style={{ textAlign: "center", color: "red" }}>
        {error.errors.signUpMessage}
      </p>
      <Form.Item
        name="firstname"
        label="First Name"
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
        name="lastname"
        label="Last Name"
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
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "This field is required!",
          },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "This field is required!",
          },
          {
            min: 6,
            message: "6 characters at least",
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
        label="Confirm Password"
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

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: "This field is required!",
          },
        ]}
      >
        <DatePicker></DatePicker>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button htmlType="submit" type="primary">
          <i className="fas fa-user-plus"></i>
          <span>Register</span>
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UserSignUp;