/** @format */
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../component/Spinner";
import moment from "moment";
import Chart from "../component/Chart";
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [load, setLoad] = useState(false);
  const [showModal, setShowModel] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const columns = [
    {
      title: "Date",
      key: 1,
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    { key: 2, title: "Amount", dataIndex: "amount" },
    { key: 3, title: "Type", dataIndex: "type" },
    { key: 4, title: "Category", dataIndex: "category" },
    { key: 5, title: "Refrence", dataIndex: "refrence" },
    {
      key: 6,
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
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
          { userid: user._id, frequency, selectedDate, type }
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
  }, [frequency, selectedDate, type]);
  const handleDelete = async (record) => {
    try {
      setLoad(true);
      await axios.post(
        "https://expense-tracker-lgyw.onrender.com/api/v1/transection/delete-transection",
        { transactionId: record._id }
      );
      setLoad(false);
      message.error("transection delete successfully");
    } catch (error) {
      setLoad(false);
      message.error("unable to delete");
    }
  };
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoad(true);
      if (editable) {
        await axios.post(
          "https://expense-tracker-lgyw.onrender.com/api/v1/transection/edit-transection",
          {
            payload: { ...values, userId: user._id },
            transactionId: editable._id,
          }
        );
        setLoad(false);
        message.success("transection updated successfully");
      } else {
        await axios.post(
          "https://expense-tracker-lgyw.onrender.com/api/v1/transection/add-transection",
          { userid: user._id, ...values }
        );
        setLoad(false);
        message.success("transection added successfully");
      }
      setShowModel(false);
      setEditable(null);
    } catch (error) {
      setLoad(false);
      message.error("failed to add transection");
    }
  };
  return (
    <>
      <Layout >
        {load && <Spinner />}
        <div style={{ padding: "40px" }} className="color-3 filters text-white">
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

          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${viewData == "table" ? "active" : "unactive"}`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${viewData == "chart" ? "active" : "unactive"}`}
              onClick={() => setViewData("chart")}
            />
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
          {viewData == "table" ? (
            <Table columns={columns} dataSource={allTransection} />
          ) : (
            <Chart allTransection={allTransection} />
          )}
        </div>
        <Modal
          title={editable ? "edit transection" : "Add transection"}
          footer={false}
          open={showModal}
          onCancel={() => {
            setShowModel(false);
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
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
