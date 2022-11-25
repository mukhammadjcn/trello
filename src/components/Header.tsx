import React from "react";
import Icons from "./Icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="container">
      <div className="header">
        <Link to={"/"}>
          <Icons name="logo" />
        </Link>

        {user ? (
          <Link to={"/profile"}>
            <Avatar
              size={"large"}
              src="https://joeschmoe.io/api/v1/random"
              style={{ borderColor: "gray" }}
            />
            <button className="btn" style={{ marginLeft: 16 }} onClick={logout}>
              Log out
            </button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
