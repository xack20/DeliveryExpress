//NPM scripts
import React, { useEffect, useState } from "react";
import Head from "next/head";
import web3 from "../../Ethereum/web3";
import styles from "../index.module.css";
import router from "next/router";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import {
  InputNumber,
  Form,
  List,
  Avatar,
  Affix,
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
} from "antd";

import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  CarryOutFilled,
  CloseOutlined,
  CheckOutlined,
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

  const APPROVAL = { 0: "Pending", 1: "Approved", 2: "Rejected", 3: "Paid" };
  const STATUS = {
    0: "Pending",
    1: "Office Near You",
    2: "On The Way",
    3: "Destination Office",
    4: "Done",
  };
  const TOS = { 1: "Regular", 2: "SameDay", 3: "Direct" };

  // useEffect(() => {
  //   // setVis(true);
  // }, [listItem]);

  const onFinish = async (values) => {
    setVis(false);
    setloading(true);

    const acc = await web3.eth.getAccounts();

    if (values["status"] !== undefined && values["status"] != listItem.status) {
      const back = await delivery.methods
        .setStatus(
          listItem.requestFrom,
          listItem.index,
          values["status"],
          !(parseInt(listItem.del_id) & 1) ? "0" : "1"
        )
        .send({ from: acc[0] });
    }

    if (
      values["approval"] !== undefined &&
      values["approval"] != listItem.approval
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

    if (values["cost"] !== undefined && values["cost"] != listItem.cost) {
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
  };

  useEffect(async () => {
    const acc = await web3.eth.getAccounts();

    const admin = await delivery.methods.admin().call();

    if (admin == acc[0]) {
      setRestriction(false);
      setloading(true);

      // data fetching
      const allUsers = await delivery.methods
        .getAllUsers()
        .call({ from: acc[0] });

      // console.log(allUsers);

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

      // console.log(QuotesList);

      setdata(QuotesList);

      setloading(false);
      message.success({
        content: "Data Loaded Successfully!",
        style: { marginTop: "10vh" },
        duration: 0.5,
      });
    } else {
      message.error({
        content: "Only Admin can access this page!",
        style: { marginTop: "10vh" },
        duration: 2,
      });
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
                className={styles.List}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Tag
                        icon={<CheckCircleOutlined />}
                        color="success"
                        style={{ fontSize: "15px" }}
                      >
                        success
                      </Tag>,
                      <Tag
                        icon={<SyncOutlined spin />}
                        color="processing"
                        style={{ fontSize: "15px" }}
                      >
                        processing
                      </Tag>,
                      <Tag
                        icon={<CloseCircleOutlined />}
                        color="error"
                        style={{ fontSize: "15px" }}
                      >
                        error
                      </Tag>,
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
                        <a href="https://ant.design">
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

            <Affix
              style={{ position: "absolute", top: 500, left: 1375 }}
              offsetTop={550}
            >
              <Tooltip
                title="Add new request"
                color={"#40a9ff"}
                placement={"topLeft"}
              >
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={
                    <PlusCircleOutlined
                      style={{
                        fontSize: "45px",
                        color: "#096dd9",
                      }}
                    />
                  }
                  onClick={() => {
                    router.push("/courier/new");
                  }}
                />
              </Tooltip>
            </Affix>
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
                  <Descriptions.Item label="Payment">
                    {listItem.approval == "3" ? "Paid" : "Not Paid"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Order ID">
                    {parseInt(listItem.del_id).toString().padStart(5, 0)}
                  </Descriptions.Item>

                  <Descriptions.Item label="Date">
                    {listItem.date}
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
                  <Descriptions.Item label="Payment">
                    {listItem.approval == "3" ? "Paid" : "Not Paid"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Order ID">
                    {parseInt(listItem.del_id).toString().padStart(5, 0)}
                  </Descriptions.Item>

                  <Descriptions.Item label="Date">
                    {listItem.date}
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
                  <Select
                    placeholder="Please select.."
                    defaultValue={
                      listItem.approval == "3"
                        ? "Approved"
                        : APPROVAL[listItem.approval]
                    }
                  >
                    <Option value="0">Pending</Option>
                    <Option value="1">Approved</Option>
                    <Option value="2">Rejected</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="cost" label="Cost" hasFeedback>
                  <InputNumber
                    defaultValue={listItem.cost}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: "100%" }}
                    min={0}
                  />
                </Form.Item>

                <Form.Item name="status" label="Tracking Status" hasFeedback>
                  <Select
                    placeholder="Please select.."
                    defaultValue={STATUS[listItem.status]}
                  >
                    <Option value="0">Pending</Option>
                    <Option value="1">Office Near You</Option>
                    <Option value="2">On The Way</Option>
                    <Option value="3">Destination Office</Option>
                    <Option value="4">Done</Option>
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
