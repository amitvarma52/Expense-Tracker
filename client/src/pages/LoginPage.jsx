/** @format */
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "../component/Spinner";
const handleLogin = (values) => {};
const LoginPage = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      setLoad(true);
      const {data}=await axios.post("/user/login", values);
      message.success("loged in ");
      localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
      setLoad(false);
      navigate("/");
    } catch (error) {
      setLoad(false);
      message.error("invalid email or password");
    }
  };
  return (
    <div className="login-page">
      {load && <Spinner />}
      <Form layout="vertical" onFinish={handleLogin}>
        <h1>Login Page</h1>
        <Form.Item label="email" name="email">
          <Input type="email"></Input>
        </Form.Item>
        <Form.Item label="password" name="password">
          <Input type="password"></Input>
        </Form.Item>
        <div className="d-flex"></div>
        <Link to={"/register"}>Not registerd ?click here to register</Link>
        <button className="btn btn-primary">Login</button>
      </Form>
    </div>
  );
};

export default LoginPage;
