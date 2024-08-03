/** @format */

import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../component/Spinner";
const RegisterPage = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      setLoad(true);
      await axios.post("http://localhost:8080/api/v1/user/register", values);
      message.success("user registerd successfully");
      setLoad(false);
      navigate("/login");
    } catch (error) {
      setLoad(false);
      message.error("invalid username or password");
    }
  };
  useEffect(()=>{
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  },[navigate])
  return (
    <div className="register-page">
      {load && <Spinner />}
      <Form layout="vertical" onFinish={handleRegister} className="form ">
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
        <button className="btn btn-primary mx-3">Register</button>
      </Form>
    </div>
  );
};

export default RegisterPage;
