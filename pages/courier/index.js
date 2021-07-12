//NPM scripts
import React from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import LayoutCustom from "../../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import { List, Avatar, Affix, Button } from "antd";
import { Tooltip } from "antd";
import { Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import styles from "../index.module.css";

// const count = 3;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const index = (props) => {
  return (
    <LayoutCustom>
      <Head>
        <title>Courier Service</title>
        <link rel="shortcut icon" href="../../images/favicon.ico" />
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
                <a key="list-loadmore-edit">edit</a>,
                <a key="list-loadmore-more">more</a>,
              ]}
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{minHeight : '700px',marginTop : '250px'}}/>
      )}

      <Affix
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
                style={{ fontSize: "40px", color: "#096dd9" }}
              />
            }
            ghost
            onClick={() => {}}
          />
        </Tooltip>
      </Affix>
    </LayoutCustom>
  );
};

index.getInitialProps = async () => {
  const admin = await delivery.methods.admin().call();

  return { admin };
  // return {test : 'Good to go!'}
};

export default index;
