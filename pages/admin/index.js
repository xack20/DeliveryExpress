//NPM scripts
import React, { useEffect, useState } from "react";
import Head from "next/head";
import web3 from "../../Ethereum/web3";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import {
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
  Result
} from "antd";

import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  DollarCircleOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import styles from "../index.module.css";
import router from "next/router";

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

  const approvalChange = (value) => {
    console.log(value);
  };

  useEffect(async () => {
    const acc = await web3.eth.getAccounts();

    const admin = await delivery.methods.admin().call();

    if (admin == acc[0]) {
      setRestriction(false);
      setloading(true);

      // data fetching
      const allUsers = await delivery.methods.getAllUsers().call({from : acc[0]});

      console.log(allUsers);


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

      {restricted ? (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          style={{marginBottom : "80px",marginTop : "30px"}}
        />
      ) : (
        <Spin size="large" tip="loading..." spinning={loading}>
          {data.length ? (
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
                        Order ID - {item[0].toString().padStart(5, 0)}
                      </a>
                    }
                    description={item[10]}
                  />
                  <div>{item[11]}</div>

                </List.Item>
              )}
            />
          ) : (
            <Empty
              style={{ minHeight: "700px", marginTop: "250px" }}
              description="No Data!"
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
            <Descriptions bordered>
              <Descriptions.Item label="Approval">
                {listItem[5] == "3" ? "Approved" : APPROVAL[listItem[5]]}
              </Descriptions.Item>
              <Descriptions.Item label="Payment">
                {listItem[5] == "3" ? "Paid" : "Not Paid"}
              </Descriptions.Item>
              <Descriptions.Item label="Tracking Status">
                {STATUS[listItem[7]]}
              </Descriptions.Item>
              <Descriptions.Item label="Cost">{listItem[6]}</Descriptions.Item>
              <Descriptions.Item label="Full Description">
                Height : {listItem[1]} , Width : {listItem[2]} , Depth :{" "}
                {listItem[3]} , Weight : {listItem[4]}
                <br />
                Distance : {listItem[8]}
                <br />
                Type of Service : {}
                <br />
                Order ID : {parseInt(listItem[0]).toString().padStart(5, 0)}
                <br />
                Date : {listItem[11]}
              </Descriptions.Item>
            </Descriptions>
            {listItem[5] == "1" && (
              <Button
                type="primary"
                block
                danger
                icon={<DollarCircleOutlined style={{ fontSize: "15px" }} />}
                style={{ marginTop: "35px", background: " #595959" }}
              >
                PayNow
              </Button>
            )}
          </Modal>
        </Spin>
      )}
    </LayoutCustom>
  );
};

export default index;
