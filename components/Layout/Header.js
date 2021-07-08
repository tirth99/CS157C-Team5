import { Layout, Typography, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/securityActions";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AddNewCamp from "../modals/AddNewCamp";

const HeaderComponent = () => {
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
      <Menu.Item key="/signup-as-user">
        <Link href="/signup-as-user">
          Sign Up
        </Link>
      </Menu.Item>
      <Menu.Item key="/login">
        <Link href="/login">
          Login
        </Link>
      </Menu.Item>
    </Menu>
  );
  const addNewCamp = () => {
    setIsAddNewCamp(true)
  }
  const onCancle = () => {
    setIsAddNewCamp(false)
  }

  const userMenu = (
    <Fragment>
      <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu mode="horizontal" theme="dark" className="p-menu">
          <Menu.Item key="/camps">
            <Link href="/camps">
            Camps
            </Link>
          </Menu.Item>
          <Menu.Item key={currentUser.username}>
            <Link href="/profile">
            <div id = "profile" className = "profile__link">
            <UserOutlined id = "profile-icon"/>
              {currentUser.username}
            </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="handleUserLogout" onClick={handleLogout}>
            {" "}
            <Link href="/login" >
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Menu>
    </Fragment>
  );

  const parkManagerMenu = (
    <Fragment>
      <Menu mode="horizontal" theme="dark" className="p-menu">
        <Menu mode="horizontal" theme="dark" className="p-menu">
          <Menu.Item key="/addNewCamp" onClick = {addNewCamp}>
          Add New Camp
          </Menu.Item>
          <Menu.Item key="/camps">
            <Link href="/camps">
              Camps
            </Link>
          </Menu.Item>
          <Menu.Item key={currentUser.username}>
            <Link href="/profile">
            <div id = "profile" className = "profile__link">
            <UserOutlined id = "profile-icon"/>
              {currentUser.username}
            </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="handleParkManagerLogout" onClick={handleLogout}>
            {" "}
            <Link href="/login" >
              Logout
            </Link>
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
  }, [user]);
  const renderMenuBasedOnRole = () => {
        if (headerMenu === 'userMenu') {
            return userMenu;
        }
        if (headerMenu === 'park-manager') {
            return parkManagerMenu;
        }
        else {
            return publicMenu;
        }
  }

  return (
    <div>
      <Header className = "header">
      <Typography level={5} className="htitle">
        California State Park <i className="fas fa-handshake"></i>
      </Typography>
      {renderMenuBasedOnRole()}
    </Header>
    <AddNewCamp isAddNewCamp = {isAddNewCamp} addNewCamp = {addNewCamp} onCancle = {onCancle}/>
    </div>
  );
};

export default HeaderComponent;
