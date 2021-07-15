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
  Empty, Tag
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
  const [loading, setloading] = useState(true);
  const [VIS, setVis] = useState(false);

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
        value : web3.utils.toWei(val, "ether")
      });

      console.log(back);

      setloading(false);
  };

  useEffect(async () => {
    const acc = await web3.eth.getAccounts();
    const DATA = await delivery.methods.getCourier(acc[0]).call({ from: acc[0] });
    
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
                  console.log(item);
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
          style={{ position: "absolute", top: 250, left: 1375 }}
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
