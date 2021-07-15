//NPM scripts
import React from "react";
import Head from 'next/head';

//Own Scripts
import delivery from "../Ethereum/delivery.js";
import LayoutCustom from "../Components/LayoutCustom.js";
import {Modal} from 'antd';

// var perf =require('./home.html');

//CSS imports
import "antd/dist/antd.css";
import styles from "./index.module.css";


const index = (props) => {
  return (
    <LayoutCustom>
      <Head>
        <title>Delivery Express</title>
      </Head>
      <div className={styles.siteLayoutContent}>
        
      </div>
      
    </LayoutCustom>
  );
};

// index.getInitialProps = async () => {
//   const admin = await delivery.methods.admin().call();

//   return { admin };
//   // return {test : 'Good to go!'}
// };

export default index;
