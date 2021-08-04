import { Layout, Typography, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../util/actions/securityActions";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import dynamic from "next/dynamic";
import Router from "next/router";

const HeaderComponent = () => {
  const AddNewCamp = dynamic(() => import("../modals/AddNewCamp"), {
    ssr: false,
  });

  const onClick = () => {
    Router.push("/");
  };

  const { Header } = Layout;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.security.user);
  const security = useSelector((state) => state.security);
  const handleLogout = () => {
    dispatch(logout());
  };
  const [isAddNewCamp, setIsAddNewCamp] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [headerMenu, setHeaderMenu] = useState("publicMenu");
  const publicMenu = (
    <Menu mode="horizontal" theme="dark" className="p-menu">
      <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu.Item key="/signup-as-user">
          <Link href="/signup-as-user">
            <div>
              <span>Sign Up </span> <i className="fas fa-user-plus"></i>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link href="/login">
            <div>
              <span>Login </span>
              <i className="fas fa-sign-in-alt"></i>
            </div>
          </Link>
        </Menu.Item>
      </Menu>
    </Menu>
  );
  const addNewCamp = () => {
    setIsAddNewCamp(true);
  };
  const onCancle = () => {
    setIsAddNewCamp(false);
  };

  const userMenu = (
    <Fragment>
      <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu.Item key="/available-campsites">
          <Link href="/available-campsites">Available Camps</Link>
        </Menu.Item>
        <Menu.Item key="/booked-camps">
          <Link href="/bookedCamps">Reservations</Link>
        </Menu.Item>
        <Menu.Item key={currentUser.username}>
          <Link href="/profile">
            <div id="profile" className="profile__link">
              <UserOutlined id="profile-icon" />
              {currentUser.username}
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="handleUserLogout" onClick={handleLogout}>
          {" "}
          <Link href="/login">Logout</Link>
        </Menu.Item>
      </Menu>
    </Fragment>
  );

  const parkManagerMenu = (
    <Fragment>
      <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu.Item key="/user-list">
          <Link href="/user-list">User List</Link>
        </Menu.Item>
          <Menu.Item key="/addNewCamp" onClick={addNewCamp}>
            Add New Camp
          </Menu.Item>
          <Menu.Item key="/available-campsites">
            <Link href="/available-campsites">Available Camps</Link>
          </Menu.Item>
          <Menu.Item key="/booked-camps">
            <Link href="/bookedCamps">Reservations</Link>
          </Menu.Item>
          <Menu.Item key={currentUser.username}>
            <Link href="/profile">
              <div id="profile" className="profile__link">
                <UserOutlined id="profile-icon" />
                {currentUser.username}
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="handleParkManagerLogout" onClick={handleLogout}>
            {" "}
            <Link href="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Menu>
    </Fragment>
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");

    if (jwt) {
      const decode = jwt_decode(jwt);
      setCurrentUser(decode);
      if (
        (user && security.validToken && user.role === "park-manager") ||
        decode.role === "park-manager"
      ) {
        setHeaderMenu("park-manager");
      } else if (
        (user && security.validToken && user.role === "user") ||
        decode.role === "user"
      ) {
        setHeaderMenu("userMenu");
      }
    } else {
      setHeaderMenu("publicMenu");
    }
  }, [user, security.validToken]);
  const renderMenuBasedOnRole = () => {
    if (headerMenu === "userMenu") {
      return userMenu;
    }
    if (headerMenu === "park-manager") {
      return parkManagerMenu;
    } else {
      return publicMenu;
    }
  };

  return (
    <div>
      <Header className="header">
        <Typography level={5} className="htitle" onClick={onClick}>
          Camping Site <i className="fas fa-hiking"></i>
        </Typography>
        {renderMenuBasedOnRole()}
      </Header>
      <AddNewCamp
        isAddNewCamp={isAddNewCamp}
        addNewCamp={addNewCamp}
        onCancle={onCancle}
      />
    </div>
  );
};

export default HeaderComponent;
