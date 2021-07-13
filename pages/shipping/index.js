//NPM scripts
import React, { useState, useEffect } from "react";
import Head from "next/head";
import web3 from "../../Ethereum/web3";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import { List, Avatar, Affix, Button, Spin, message } from "antd";
import { Tooltip } from "antd";
import { Empty, Tag } from "antd";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import styles from "../index.module.css";
import router from "next/router";

const index = (props) => {
  const [data, setdata] = useState([]);

  const [loading, setloading] = useState(true);

  useEffect(async () => {
    const me = await web3.eth.getAccounts();
    const DATA = await delivery.methods.getShipping().call({ from: me[0] });
    setdata([...DATA].reverse());
    setloading(false);
    message.success({content : 'Data Loaded Successfully!',style: {marginTop : '10vh'}, duration : 0.5});
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
              >
                {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">Order ID - {item[0].toString().padStart(5,0)}</a>}
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
            style={{ position: "absolute", top: 500, left: 1350 }}
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
      </Spin>
    </LayoutCustom>
  );
};

// index.getInitialProps = async () => {
//   const admin = await delivery.methods.admin().call();

//   return { admin };
//   // return {test : 'Good to go!'}
// };

export default index;
