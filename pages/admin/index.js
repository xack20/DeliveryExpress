//NPM scripts
import React, { useEffect, useState } from "react";
import Head from "next/head";
import web3 from "../../Ethereum/web3";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import { List, Avatar, Affix, Button } from "antd";
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

// const count = 3;

const index = (props) => {
  const [data, setdata] = useState([]);

  useEffect(async () => {
    const me = await web3.eth.getAccounts();
    const DATA = await delivery.methods.getCourier().call({ from: me[0] });
    setdata(DATA);
    console.log(DATA);
  }, []);

  return (
    <LayoutCustom>
      <Head>
        <title>All Quotes</title>
        {/* <link rel="shortcut icon" href="../../images/favicon.ico" /> */}
      </Head>
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
                title={<a href="https://ant.design">{item[7]}</a>}
                description={item[10]}
              />
              {/* <div>content</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      ) : (
        <Empty
          // image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ minHeight: "700px", marginTop: "250px" }}
          description="No Data!"
        />
      )}

      {/* <Affix
        style={{ position: "absolute", top: 550, left: 1350 }}
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
      </Affix> */}
    </LayoutCustom>
  );
};

// index.getInitialProps = async () => {
//   const me = await web3.eth.getAccounts();
//   const DATA = await delivery.methods.setStatus("0x24776C87d7DF39D3Bb2f4ACcAbE8640B650910DB",0,1,0).send({from : me[0],gas : '1000000'});

//   return { me };
//   // return {test : 'Good to go!'}
// };

export default index;
