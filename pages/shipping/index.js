//NPM scripts
import React, { useState, useEffect } from "react";
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
  Tooltip,
  Empty,
  Tag,
  Modal,
  Switch,
  Descriptions,
  notification,
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
  ClockCircleFilled,
  ClockCircleOutlined,
  InfoCircleTwoTone
} from "@ant-design/icons";

import styles from "../index.module.css";
import router from "next/router";

const index = (props) => {
  const [data, setdata] = useState([]);
  const [VIS, setVis] = useState(false);
  const [loading, setloading] = useState(true);

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

  const payment = async () => {
    setVis(false);
    setloading(true);

    const val = ((parseInt(listItem.cost) + 1) * 0.00051)
      .toString()
      .substring(0, 5);

    let acc, back, prevBal;

    try {
      acc = await web3.eth.getAccounts();

      prevBal = await web3.eth.getBalance(acc[0]);

      back = await delivery.methods
        .makePayment(listItem.del_id, listItem.index)
        .send({
          from: acc[0],
          value: web3.utils.toWei(val.toString(), "ether"),
        });

      setloading(false);

      const balNow = await web3.eth.getBalance(acc[0]);
      const balDiff = (prevBal - balNow).toString();

      notification.success({
        message: `Request Approved`,
        description: (
          <div>
            <p>
              <b>Status : </b>
              {back.status}
            </p>
            <p>
              <b>TO : </b>
              {back.to}
            </p>
            <p>
              <b>Value sent : </b>
              {balDiff}
            </p>
            <p>
              <b>Balance Now : </b>
              {parseInt(balNow) / 1000000000000000000}
            </p>
            <p>
              <b>GasUsed : </b>
              {back.gasUsed}
            </p>
            <p>
              <b>TrasactionHash : </b>
              {back.transactionHash}
            </p>
          </div>
        ),
        placement: "bottomRight",
      });
    } catch (error) {
      setloading(false);
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: "bottomRight",
      });
    }
  };

  useEffect(async () => {
    let DATA, acc;
    try {
      acc = await web3.eth.getAccounts();
      DATA = await delivery.methods.getShipping(acc[0]).call({ from: acc[0] });
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: "bottomRight",
      });
    }

    let tempList = [];
    for (let i = 0; i < DATA.length; i++) {
      tempList.push({
        index: i,
        ...DATA[i],
      });
    }
    setdata([...tempList].reverse());

    setloading(false);
    message.success({
      content: "Data Loaded Successfully!",
      style: { marginTop: "10vh" },
      duration: 0.5,
    });
  }, []);

  return (
    <LayoutCustom>
      <Head>
        <title>Shipping Service</title>
      </Head>
      <Spin size="large" tip="loading..." spinning={loading}>
        {data.length ? (
          <List
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
                        APPROVAL[item.approval === "3" ? 1 : item.approval][2]
                      }
                      color={
                        APPROVAL[item.approval === "3" ? 1 : item.approval][1]
                      }
                      style={{ fontSize: "15px" }}
                    >
                      {APPROVAL[item.approval === "3" ? 1 : item.approval][0]}
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
                  setVis(true);
                  setlistItem(item);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <a href="#">
                      Order ID - {item[0].toString().padStart(5, 0)}
                    </a>
                  }
                  description={item[7]}
                />
                <div>{item[8]}</div>
              </List.Item>
            )}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ minHeight: "700px", marginTop: "250px" }}
            description="No Shipping Data!"
          />
        )}

        <Tooltip
          title="Add new request"
          color={"#40a9ff"}
          placement={"topLeft"}
        >
          <Affix
            style={{ position: "absolute", top: 250, left: 1375 }}
            offsetTop={550}
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
                    // boxShadow: "0 5px 15px rgba(145, 92, 182, .4)",
                    // backgroundColor: "Transparent"
                  }}
                />
              }
              onClick={() => {
                router.push("/shipping/new");
              }}
              // style={{backgroundColor: "Transparent"}}
            />
          </Affix>
        </Tooltip>
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
            <Descriptions.Item label="Cost">{listItem[2]} $</Descriptions.Item>
            <Descriptions.Item label="Track ID">
              {parseInt(listItem[0]).toString().padStart(5, 0)}-{listItem.index}
            </Descriptions.Item>
            <Descriptions.Item label="Full Description">
              Truck Load Type: {listItem[4]}
              <br />
              Distance : {listItem[5]}
              <br />
              Type of commodity : {listItem[6]}
              <br />
              Order ID : {parseInt(listItem[0]).toString().padStart(5, 0)}
              <br />
              Date : {listItem[8]}
            </Descriptions.Item>
          </Descriptions>
          {listItem.approval == "1" && (
            <Button
              type="primary"
              block
              danger
              icon={<DollarCircleOutlined style={{ fontSize: "15px" }} />}
              style={{ marginTop: "35px", background: " #595959" }}
              onClick={payment}
            >
              PayNow
            </Button>
          )}
        </Modal>
      </Spin>
    </LayoutCustom>
  );
};

export default index;
