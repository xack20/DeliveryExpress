import React, { useState, useEffect } from "react";

//Own Scripts
import web3 from "../Ethereum/web3";
import delivery from "../Ethereum/delivery.js";

import { Layout, Menu } from "antd";

import "antd/dist/antd.css";
import styles from "./HeaderCustom.module.css";

import { TwitterOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import router from "next/router";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const { Header } = Layout;

const HeaderCustom = (props) => {
  const menuClicked = (e) => {
    const url = {
      1: "/",
      2: "/admin/",
      3: "/courier/",
      4: "/shipping/",
      5: "/tracking",
    };
    
    router.push(url[e.key]);
  };

  const [whoAmI, setwhoAmI] = useState("")

  const checkAccount = async () => {
      const acc = await web3.eth.getAccounts();
      const admin = await delivery.methods.admin().call();
      if(admin == acc[0]){
        setwhoAmI("admin");
      }
      else if(acc[0]){
        setwhoAmI("user");
      }
  }

  useEffect(() => {
    checkAccount();
    console.log(whoAmI);
  }, [])


  const who = {
    "admin" : "65%",
    "user" :  "60%",
    "" : "75%"
  }
 

  return (
    <Header
      className={styles.sticky}
      style={{
        background: "rgba(255, 255, 255, .8)",
        height: "90px",
        boxShadow: "0px 1px 1px rgba(235, 235, 235, 1.0)",
        marginBottom: "5px",
        // position : "fixed"
      }}
    >
      <div className={styles.logo} />
      <IconFont
        type="icon-facebook"
        style={{
          float: "right",
          fontSize: "28px",
          color: "#3b5998",
          marginTop: "28px",
          marginRight: "50px",
        }}
      />
      <TwitterOutlined
        style={{
          float: "right",
          fontSize: "30px",
          color: "#00acee",
          marginTop: "28px",
          marginRight: "20px",
        }}
      />
      <Menu
        className={styles.menu}
        onClick={menuClicked}
        theme="white"
        mode="horizontal"
        style={{
          // float: "right",
          border: 0,
          marginLeft : who[whoAmI],
          marginTop: "10px",
          background: "rgba(0, 0, 0, 0)",
        }}
        // defaultSelectedKeys={[props.menu]}
      >
        <Menu.Item key="1">Home</Menu.Item>
        {whoAmI=="user" && <Menu.Item key="3">Courier</Menu.Item>}
        {whoAmI=="user" && <Menu.Item key="4">Shipping</Menu.Item>}
        <Menu.Item key="5">Tracking</Menu.Item>
        {whoAmI=="admin" && <Menu.Item key="2">All Quotes</Menu.Item>}
      </Menu>
    </Header>
  );
};


export default HeaderCustom;
