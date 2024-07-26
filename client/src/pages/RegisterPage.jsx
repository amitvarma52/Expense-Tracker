/** @format */

import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../component/Spinner";
const RegisterPage = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      setLoad(true);
      await axios.post("/user/register", values);
      message.success("user registerd successfully");
      setLoad(false);
      navigate("/");
    } catch (error) {
      setLoad(false);
      message.error("invalid username or password");
    }
  };
  return (
    <div className="register-page">
      {load && <Spinner />}
      <Form layout="vertical" onFinish={handleRegister}>
        <h1>Register Page</h1>
        <Form.Item label="name" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="email" name="email">
          <Input type="email"></Input>
        </Form.Item>
        <Form.Item label="password" name="password">
          <Input type="password"></Input>
        </Form.Item>
        <div className="d-flex"></div>
        <Link to={"/login"}>Alredy registerd ?click here to login</Link>
        <button className="btn btn-primary">Register</button>
      </Form>
    </div>
  );
};

export default RegisterPage;
