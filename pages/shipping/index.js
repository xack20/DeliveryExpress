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
  const [VIS, setVis] = useState(false);
  const [loading, setloading] = useState(true);

  const [listItem, setlistItem] = useState({});

  const APPROVAL = { 0: "Pending", 1: "Approved", 2: "Rejected", 3: "Paid" };
  const STATUS = {
    0: "Pending",
    1: "Office Near You",
    2: "On The Way",
    3: "Destination Office",
    4: "Done",
  };


  const payment = async () => {
    setVis(false);
    setloading(true);

    const val = (parseInt(listItem.cost)+1000000000000).toString();

    // console.log(val,listItem.del_id,listItem.index);

    const acc = await web3.eth.getAccounts();

    const back = await delivery.methods.makePayment(
      listItem.del_id,
      listItem.index
    ).send({
      from : acc[0],
      value : web3.utils.toWei(val.toString(), "ether")
    });

    console.log(back);

    setloading(false);
};



  useEffect(async () => {
    const acc = await web3.eth.getAccounts();
    const DATA = await delivery.methods.getShipping(acc[0]).call({ from: acc[0] });
    
    let tempList=[];
    for(let i=0;i<DATA.length;i++){
      tempList.push({
        index:i,
        ...DATA[i]
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
        {/* <link rel="shortcut icon" href="../../images/favicon.ico" /> */}
      </Head>
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
                  setVis(true);
                  setlistItem(item);
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
                  description={item[7]}
                />
                <div>{item[8]}</div>
                {/* </Skeleton> */}
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
            <Descriptions.Item label="Approval">
              {listItem[1] == "3" ? "Approved" : APPROVAL[listItem[1]]}
            </Descriptions.Item>
            <Descriptions.Item label="Payment">
              {listItem[1] == "3" ? "Paid" : "Not Paid"}
            </Descriptions.Item>
            <Descriptions.Item label="Tracking Status">
              {STATUS[listItem[3]]}
            </Descriptions.Item>
            <Descriptions.Item label="Cost">{listItem[2]}</Descriptions.Item>
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
