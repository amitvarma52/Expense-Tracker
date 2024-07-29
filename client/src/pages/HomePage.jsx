/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import { Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import Spinner from "../component/Spinner";
const HomePage = () => {
  const [load, setLoad] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const getAllTransections = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoad(true);
      const data=await axios.post(
        "http://localhost:8080/api/v1/transection/get-transection",
        { userid: user._id }
      );
      setLoad(false);
      setAllTransection(data.data)
      console.log(data.data);
      message.success("transection added successfully");
      setShowModel(false);
    } catch (error) {
      message.error("failed to fetch data")
    }
  };
  useEffect(()=>{
    getAllTransections()
  },[])
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoad(true);
      await axios.post(
        "http://localhost:8080/api/v1/transection/add-transection",
        { userid: user._id, ...values }
      );
      setLoad(false);
      message.success("transection added successfully");
      setShowModel(false);
    } catch (error) {
      setLoad(false);
      message.error("failed to add transection");
    }
  };
  return (
    <>
      <Layout>
        {load && <Spinner />}
        <div className="filters">
          <div>range filter</div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowModel(true);
              }}
            >
              Add new
            </button>
          </div>
        </div>
        <div className="content">
          <Modal
            title="Add transection"
            footer={false}
            open={showModal}
            onCancel={() => {
              setShowModel(false);
            }}
          >
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Amount" name="amount">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Select>
                  <Select.Option value="income">income</Select.Option>
                  <Select.Option value="expense">expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select>
                  <Select.Option value="salary">salary</Select.Option>
                  <Select.Option value="tip">tip</Select.Option>
                  <Select.Option value="project">project</Select.Option>
                  <Select.Option value="food">movie</Select.Option>
                  <Select.Option value="fee">fee</Select.Option>
                  <Select.Option value="bill">bill</Select.Option>
                  <Select.Option value="medicine">medicine</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Refrence" name="refrence">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input type="text" />
              </Form.Item>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">
                  SAVE
                </button>
              </div>
            </Form>
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
