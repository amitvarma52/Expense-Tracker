import React from 'react'
import {Form ,Input} from 'antd'
import { Link } from 'react-router-dom';
const RegisterPage = () => {
  return (
    <div className="register-page">
      <Form layout="vertical">
        <h1>Register Page</h1>
        <Form.Item label="name" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="email" name="email">
          <Input type='email'></Input>
        </Form.Item>
        <Form.Item label="password" name="password">
          <Input type='password'></Input>
        </Form.Item>
        <div className='d-flex'></div>
        <Link to={'/login'}>Alredy registerd ?click here to login</Link>
        <button className='btn btn-primary'>Register</button>
      </Form>
    </div>
  );
}

export default RegisterPage