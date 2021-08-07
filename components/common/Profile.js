import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";
import { updateCurrentUser } from "../../util/actions/securityActions";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const dispatch = useDispatch();
  const dateFormat = "YYYY/MM/DD";
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    username: props.user.username,
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    role: props.user.role,
    birthday: props.user.birthday,
  });
  useEffect(() => {
    const dob = user.birthday.slice(0, 10);
    form.setFieldsValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthday: moment(dob),
    });
  }, [user]);

  const toUpperCase = (role) => {
    const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1);
    return roleCapitalized;
  };

  const updateUser = () => {
    console.log("Updating user...");
    form.validateFields().then((updatedUser) => {
      (updatedUser["username"] = user.username),
        (updatedUser["birthday"] = updatedUser["birthday"]
          ? updatedUser["birthday"].format("YYYY-MM-DD")
          : "");
      dispatch(updateCurrentUser(updatedUser));
    });
  };

  return (
    <>
      <div className="profile__center">
        <h2 className="role">Profile : {toUpperCase(user.role)}</h2>
        <Form
          style={{ width: "100vw" }}
          form={form}
          onFinish={updateUser}
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 8 }}
        >
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
          <Form.Item name="birthday" label="Date of Birth">
            <DatePicker format={dateFormat}></DatePicker>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button htmlType="submit" type="primary">
              <i className="fas fa-user-edit"></i> Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Profile;
