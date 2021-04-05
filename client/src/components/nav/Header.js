import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  // MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));
  // let { page } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="float-right"
    >
      {/* {user && !page.on_home_page && ( */}
      {user && (
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
      )}

      {/* {!user && !page.on_login_page && ( */}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {/* {!user && !page.on_regis_page && ( */}
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]} //['pswebco','gmail']
          className="float-right"
        >
          <Menu.ItemGroup title="Options">
            <Item key="option:1">Option 1</Item>
            <Item key="option:2">Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </Menu.ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
