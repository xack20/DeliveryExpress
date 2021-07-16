//NPM scripts
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";
import web3 from "../../Ethereum/web3";

//CSS imports
import "antd/dist/antd.css";
import styles from "../index.module.css";

// Antd Imports
import {
  InputNumber,
  Form,
  List,
  Avatar,
  Button,
  Spin,
  message,
  Descriptions,
  Select,
  Switch,
  Modal,
  Tooltip,
  Empty,
  Tag,
  Result,
  notification,
} from "antd";

import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  CarryOutFilled,
  CloseOutlined,
  CheckOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
  InfoCircleTwoTone
} from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const index = (props) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [VIS, setVis] = useState(false);
  const [restricted, setRestriction] = useState(true);
  const [listItem, setlistItem] = useState({});

  const APPROVAL = {
    0: ["Pending", "default", <ClockCircleOutlined />],
    1: ["Approved", "success", <CheckCircleOutlined />],
    2: ["Rejected", "error", <CloseCircleOutlined />],
  };

  const STATUS = {
    0: ["You have it", "processing", <InfoCircleTwoTone />],
    1: ["Office (Near You)", "default", <ClockCircleOutlined spin />],
    2: ["On The Way", "processing", <SyncOutlined spin />],
    3: ["Office (Near Dest.)", "default", <ClockCircleFilled spin />],
    4: ["Reached to Dest.", "success", <CheckCircleOutlined />],
  };

  const TOS = { 1: "Regular", 2: "SameDay", 3: "Direct" };

  const onFinish = async (values) => {
    try {
      setVis(false);
      setloading(true);

      const acc = await web3.eth.getAccounts();

      if (
        values["status"] !== undefined &&
        values["status"] !== listItem.status
      ) {
        const back = await delivery.methods
          .setStatus(
            listItem.requestFrom,
            listItem.index,
            values["status"],
            (parseInt(listItem.del_id) & 1) === 1 ? "0" : "1"
          )
          .send({ from: acc[0] });
      }

      if (
        values["approval"] !== undefined &&
        values["approval"] !== listItem.approval
      ) {
        const back = await delivery.methods
          .setApproval(
            values["approval"],
            listItem.requestFrom,
            listItem.del_id,
            listItem.index
          )
          .send({ from: acc[0] });
      }

      if (values["cost"] !== undefined && values["cost"] !== listItem.cost) {
        const back = await delivery.methods
          .setCost(
            values["cost"],
            listItem.requestFrom,
            listItem.del_id,
            listItem.index
          )
          .send({ from: acc[0] });
      }

      setloading(false);
      Router.reload(window.location.pathname);
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: "bottomRight",
      });
      setloading(false);
    }
  };

  useEffect(async () => {
    try {
      const acc = await web3.eth.getAccounts();

      const admin = await delivery.methods.admin().call();

      if (admin == acc[0]) {
        setRestriction(false);
        setloading(true);

        // data fetching

        const allUsers = await delivery.methods
          .getAllUsers()
          .call({ from: acc[0] });

        let QuotesList = [];

        for (let i = 0; i < allUsers.length; i++) {
          const couriers = await delivery.methods
            .getCourier(allUsers[i])
            .call({ from: acc[0] });
          const shippings = await delivery.methods
            .getShipping(allUsers[i])
            .call({ from: acc[0] });

          for (let i = 0; i < couriers.length; i++) {
            QuotesList.push({
              index: i,
              ...couriers[i],
            });
          }

          for (let i = 0; i < shippings.length; i++) {
            QuotesList.push({
              index: i,
              ...shippings[i],
            });
          }
        }

        QuotesList.sort((a, b) => new Date(b["date"]) - new Date(a["date"]));

        setdata(QuotesList);

        setloading(false);

        if (QuotesList.length)
          message.success({
            content: "Data Loaded Successfully!",
            style: { marginTop: "10vh" },
            duration: 0.5,
          });
        else
          message.warning({
            content: "Nothing to Display!",
            style: { marginTop: "10vh" },
            duration: 2,
          });
      } else {
        message.error({
          content: "Only Admin can access this page!",
          style: { marginTop: "10vh" },
          duration: 2,
        });
      }
    } catch {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: "bottomRight",
      });
      setloading(false);
    }
  }, []);

  return (
    <LayoutCustom>
      <Head>
        <title>Quotes List</title>
      </Head>
      <Spin
        size="large"
        tip="loading..."
        spinning={loading}
        style={{ zIndex: "10" }}
      >
        {!restricted ? (
          <>
            {!data.length ? (
              <Empty
                style={{ minHeight: "700px", marginTop: "250px" }}
                description="No Data!"
              />
            ) : (
              <List
                style={{ margin: "25px" }}
                className={styles.List}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Tooltip
                        title="Approval Status"
                        color={
                          APPROVAL[item.approval === "3" ? 1 : item.approval][1]
                        }
                        placement="topLeft"
                      >
                        <Tag
                          icon={
                            APPROVAL[
                              item.approval === "3" ? 1 : item.approval
                            ][2]
                          }
                          color={
                            APPROVAL[
                              item.approval === "3" ? 1 : item.approval
                            ][1]
                          }
                          style={{ fontSize: "15px" }}
                        >
                          {
                            APPROVAL[
                              item.approval === "3" ? 1 : item.approval
                            ][0]
                          }
                        </Tag>
                      </Tooltip>,
                      <Tooltip
                        title="Payment Status"
                        color={item.approval == 3 ? "success" : "error"}
                        placement="topLeft"
                      >
                        <Tag
                          icon={
                            item.approval == 3 ? (
                              <CheckCircleOutlined />
                            ) : (
                              <CloseCircleOutlined />
                            )
                          }
                          color={item.approval == 3 ? "success" : "error"}
                          style={{ fontSize: "15px" }}
                        >
                          {item.approval == 3 ? "Paid" : "Not Paid"}
                        </Tag>
                      </Tooltip>,
                      <Tooltip
                        color={STATUS[item.status][1]}
                        title="Tracking Status"
                        placement="topLeft"
                      >
                        <Tag
                          icon={STATUS[item.status][2]}
                          color={STATUS[item.status][1]}
                          style={{ fontSize: "15px" }}
                        >
                          {STATUS[item.status][0]}
                        </Tag>
                      </Tooltip>,
                    ]}
                    onClick={() => {
                      setlistItem(item);
                      console.log(item);
                      setVis(true);
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={
                        <a href="#">
                          Order ID - {item.del_id.toString().padStart(5, 0)}
                        </a>
                      }
                      description={item.requestFrom}
                    />
                    <div>{item.date}</div>
                  </List.Item>
                )}
              />
            )}

            <Modal
              visible={VIS}
              onCancel={() => {
                setVis(false);
              }}
              centered={true}
              footer={null}
              closeIcon={
                <CloseCircleTwoTone
                  twoToneColor="#bfbfbf"
                  style={{ fontSize: "25px" }}
                />
              }
              style={{
                marginTop: "25px",
                overflowX: "hidden",
                borderRadius: "5px",
              }}
              width={850}
              className="shadow-sm bg-body rounded"
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
              />
              <h5
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  fontSize: "18px",
                }}
              >
                Details
              </h5>
              {parseInt(listItem.del_id) & 1 ? (
                <Descriptions bordered>
                  <Descriptions.Item label="Order ID">
                    {parseInt(listItem.del_id).toString().padStart(5, 0)}
                  </Descriptions.Item>

                  <Descriptions.Item label="Date">
                    {listItem.date}
                  </Descriptions.Item>

                  <Descriptions.Item label="Cost">
                    {listItem.cost} $
                  </Descriptions.Item>

                  <Descriptions.Item label="Track ID">
                    {parseInt(listItem[0]).toString().padStart(5, 0)}-
                    {listItem.index}
                  </Descriptions.Item>

                  <Descriptions.Item label="Full Description">
                    Height : {listItem.height} , Width : {listItem.width} ,
                    Depth : {listItem.depth} , Weight : {listItem.weight}
                    <br />
                    Distance : {listItem.distance}
                    <br />
                    Type of Service : {TOS[listItem.typeOfService]}
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                <Descriptions bordered>
                  <Descriptions.Item label="Order ID">
                    {parseInt(listItem.del_id).toString().padStart(5, 0)}
                  </Descriptions.Item>

                  <Descriptions.Item label="Date">
                    {listItem.date}
                  </Descriptions.Item>

                  <Descriptions.Item label="Cost">
                    {listItem.cost} $
                  </Descriptions.Item>

                  <Descriptions.Item label="Track ID">
                    {parseInt(listItem[0]).toString().padStart(5, 0)}-
                    {listItem.index}
                  </Descriptions.Item>

                  <Descriptions.Item label="Full Description">
                    Distance : {listItem.distance}
                    <br />
                    Type of commodity : {listItem.typeOfCommodity}
                    <br />
                    Truck Load Type : {listItem.truckLoadType}
                  </Descriptions.Item>
                </Descriptions>
              )}

              <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                style={{ marginTop: "20px" }}
              >
                <Form.Item name="approval" label="Approval Status" hasFeedback>
                  <Select placeholder="Please select..">
                    <Option value="0">Pending</Option>
                    <Option value="1">Approved</Option>
                    <Option value="2">Rejected</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="cost" label="Cost" hasFeedback>
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: "100%" }}
                    min={0}
                  />
                </Form.Item>

                <Form.Item name="status" label="Tracking Status" hasFeedback>
                  <Select placeholder="Please select..">
                    <Option value="0">You have it</Option>
                    <Option value="1">Office(Near You)</Option>
                    <Option value="2">On The Way</Option>
                    <Option value="3">Office (Near Dest.)</Option>
                    <Option value="4">Reached Dest.</Option>
                  </Select>
                </Form.Item>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  icon={<CarryOutFilled style={{ fontSize: "15px" }} />}
                  style={{ marginTop: "10px" }}
                >
                  Update
                </Button>
              </Form>
            </Modal>
          </>
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            style={{ marginBottom: "80px", marginTop: "30px" }}
          />
        )}
      </Spin>
    </LayoutCustom>
  );
};

export default index;
