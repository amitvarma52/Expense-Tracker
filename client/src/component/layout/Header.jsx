/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const hangleLogout = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="text-white color-2">
        <Link className="navbar-brand" to="/">
          Expense Tracker
        </Link>
        <ul className="d-flex">
          <li className="nav-item">
            {loginUser && loginUser.name}
          </li>
          <li className="nav-item">
            <button className="btn btn-primary" onClick={hangleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
