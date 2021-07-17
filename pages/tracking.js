//NPM scripts
import React, { useState } from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../Ethereum/delivery.js";
import web3 from "../Ethereum/web3.js";
import LayoutCustom from "../Components/LayoutCustom.js";

import { Input, Modal, notification, Spin,Tag } from "antd";

import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

//CSS imports
import "antd/dist/antd.css";
import styles from "./index.module.css";

const { Search } = Input;

const tracking = (props) => {
  const STATUS = {
    0: ["You have it", "processing", <InfoCircleTwoTone />],
    1: ["Office (Near You)", "default", <ClockCircleOutlined spin />],
    2: ["On The Way", "processing", <SyncOutlined spin />],
    3: ["Office (Near Dest.)", "default", <ClockCircleFilled spin />],
    4: ["Reached to Dest.", "success", <CheckCircleOutlined />],
  };

  const [spinning, setSpinning] = useState(false);

  const onSearch = async (e) => {
    setSpinning(true);
    try {
      let parts = e.split("-");
      const acc = await web3.eth.getAccounts();
      const status = await delivery.methods
        .getStatus(parseInt(parts[0]), parseInt(parts[1]))
        .call({ from: acc[0] });

      setSpinning(false);

      Modal.info({
        title: "Recent Status",
        content: (
          <div>
            <p>Your Product's recent status is...</p>
            <Tag
              icon={STATUS[status][2]}
              color={STATUS[status][1]}
              style={{ fontSize: "15px" }}
            >
              {STATUS[status][0]}
            </Tag>
          </div>
        ),
        onOk() {},
      });
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: e === "" ? "Field is empty" : error.message,
        placement: "bottomRight",
      });
    }
    setSpinning(false);
  };

  return (
    <LayoutCustom>
      <Head>
        <title>Tracking Service</title>
      </Head>

      <Spin size="large" tip="loading..." spinning={spinning}>
        <div className={styles.siteLayoutContent}>
          <h1
            style={{
              fontSize: "20px",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              fontFamily: "monospace",
              marginTop: "100px",
              fontWeight: "bold",
            }}
          >
            Get 24 hours Tracking Service....
          </h1>

          <Search
            placeholder="Insert your TrackID here... (i.e. 00024-0)"
            onSearch={onSearch}
            enterButton
            style={{
              marginTop: "50px",
              opacity: ".7",
              width: "50%",
              marginLeft: "25%",
            }}
            size="large"
            rules={[
              {
                required: true,
                message: "Can't be blank",
              },
            ]}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              background: "#fff",
              marginTop: "30px",
              padding: "10px",
              backgroundColor: "transparent",
            }}
          ></div>
        </div>
      </Spin>
    </LayoutCustom>
  );
};

export default tracking;
