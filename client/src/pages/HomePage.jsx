/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../component/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [load, setLoad] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("yyyy-mm-dd")}</span>,
    },
    { title: "Amount", dataIndex: "amount" },
    { title: "Type", dataIndex: "type" },
    { title: "Category", dataIndex: "category" },
    { title: "Refrence", dataIndex: "refrence" },
    { title: "Actions" },
  ];
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoad(true);
        const data = await axios.post(
          "http://localhost:8080/api/v1/transection/get-transection",
          { userid: user._id, frequency, selectedDate,type }
        );
        setLoad(false);
        setAllTransection(data.data);
        message.success("transection added successfully");
        setShowModel(false);
      } catch (error) {
        message.error("failed to fetch data");
        setShowModel(false);
      }
    };
    getAllTransections();
  }, [frequency, selectedDate,type]);
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
          <div>
            <h1>select frequency</h1>
            <Select
              value={frequency}
              onChange={(values) => {
                setFrequency(values);
              }}
            >
              <Select.Option value="7">last 1 week </Select.Option>
              <Select.Option value="30">last 1 month</Select.Option>
              <Select.Option value="365">last 1 year</Select.Option>
              <Select.Option value="custom">custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => {
                  setSelectedDate(values);
                }}
              />
            )}
          </div>
          <div>
            <h1>select type</h1>
            <Select
              value={type}
              onChange={(values) => {
                setType(values);
              }}
            >
              <Select.Option value="all">all</Select.Option>
              <Select.Option value="income">income</Select.Option>
              <Select.Option value="expense">expense</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => {
                  setSelectedDate(values);
                }}
              />
            )}
          </div>
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
          <Table columns={columns} dataSource={allTransection}>
            {" "}
          </Table>
        </div>
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
      </Layout>
    </>
  );
};

export default HomePage;
