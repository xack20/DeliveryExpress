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
} from "antd";
import { Tooltip } from "antd";
import { Empty, Tag } from "antd";
import {
  Table,
  Card,
  Modal,
  DatePicker,
  Row,
  Col,
  Input,
  Timeline,
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

const { Option } = Select;

// const count = 3;

const index = (props) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [VIS, setVis] = useState(false);

  const [listItem, setlistItem] = useState({})

  const approvalChange = (value) => {
    console.log(value);
  };

  const PendOrRun = (value) => {
    console.log(value);
  };

  const payment = async () => {};

  useEffect(async () => {
    const me = await web3.eth.getAccounts();
    const DATA = await delivery.methods.getCourier().call({ from: me[0] });
    setdata([...DATA].reverse());
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
        <title>Courier Service</title>
      </Head>

      {/* Modal Section Starts*/}

      <Spin size="large" tip="loading..." spinning={loading}>
        {data.length ? (
          <List
            className={styles.List}
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
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
                  setVis(true);
                }}
              >
                {/* <Skeleton avatar title={false} loading={item.loading} active> */}
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

                {/* </Skeleton> */}
              </List.Item>
            )}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ minHeight: "700px", marginTop: "250px" }}
            description="No Courier Data!"
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
                    // boxShadow: "0 5px 15px rgba(145, 92, 182, .4)"
                  }}
                />
              }
              onClick={() => {
                router.push("/courier/new");
              }}

              // style={{boxShadow: "0 5px 15px rgba(145, 92, 182, .4)"}}
            />
          </Tooltip>
        </Affix>
      </Spin>

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
        width={1000}
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
          <Descriptions.Item label="Approval">Pending</Descriptions.Item>
          <Descriptions.Item label="Payment">NotPaid</Descriptions.Item>
          <Descriptions.Item label="Tracking Status">Pending</Descriptions.Item>
          <Descriptions.Item label="Cost">200 Gwei</Descriptions.Item>
          <Descriptions.Item label="Full Description"></Descriptions.Item>
        </Descriptions>
        <Button type="primary" block danger icon={<DollarCircleOutlined style={{fontSize : '15px'}} />} style={{marginTop : '15px'}}>
          PayNow
        </Button>
      </Modal>
    </LayoutCustom>
  );
};

export default index;
