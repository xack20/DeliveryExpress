//NPM scripts
import React from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../Ethereum/delivery.js";
import LayoutCustom from "../Components/LayoutCustom.js";

import { Input, Card,Timeline } from "antd";

//CSS imports
import "antd/dist/antd.css";
import styles from "./index.module.css";

const { Search } = Input;

const tracking = (props) => {
  const onSearch = (e) => {
    console.log(e);
  };

  return (
    <LayoutCustom>
      <div className={styles.siteLayoutContent} style={{ marginTop: "30px" }}>
        <Head>
          <title>Tracking Service</title>
        </Head>

        <h1>Get 24 hours Tracking Service....</h1>

        <Search
          placeholder="Insert your Order Id here... i.e. 00024"
          onSearch={onSearch}
          enterButton
          style={{ marginTop: "50px" }}
          size="large"
        />
        <div style={{display:"flex",width:'100%',background : '#fff', marginTop : '30px', padding : '10px'}}>
          <Card style={{ margin: '20px',width : '50%' }} type="inner" title="Inner Card title">
            Inner Card content
          </Card>
          <Timeline pending="Recording..." style={{marginTop : '20px', marginLeft : '100px'}} mode="right">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          </Timeline>
        </div>
      </div>
    </LayoutCustom>
  );
};

// tracking.getInitialProps = async () => {
//   const admin = await delivery.methods.admin().call();

//   return { admin };
//   // return {test : 'Good to go!'}
// };

export default tracking;
