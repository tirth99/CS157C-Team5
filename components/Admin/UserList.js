import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiRoutes from "../../util/APIConfig";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import types from "../../util/ActionTypes";

const UserList = () => {
  const { DELETE_USER } = types;
  const { FETCH_ALL_USERS_URL, DELETE_USER_BY_ID_URL } = ApiRoutes;
  const jwt = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const security = useSelector((state) => state.security);
  let newState = security.isDeleted + 1;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(FETCH_ALL_USERS_URL, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((response) => {
        let users = [];
        response.data.allUsers.map((user) => {
          user.birthday = user.birthday.slice(0, 10);
          if (user.role === "user") {
            users.push(user);
          }
        });
        setUsers(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [security.isDeleted]);
  const onDelete = (e) => {
    axios
      .delete(DELETE_USER_BY_ID_URL + e.target.value, {
        headers: {
          Authorization: jwt,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          payload: {
            isDeleted: newState,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      sortDirections: ["descend", "ascend"],
      key: "firstname",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      render: function renderDeleteBtn(text) {
        return <span style={{ color: "#009fe1" }}>{text}</span>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Date Of Birth",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: function renderDeleteBtn(id, record) {
        return (
          <Space size="middle">
            <button
              onClick={onDelete}
              value={id}
              style={{ marginLeft: "10px" }}
              className="btn btn-danger"
            >
              Delete{" "}
            </button>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ background: "white" }}>
      <div className="user__list">
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default UserList;