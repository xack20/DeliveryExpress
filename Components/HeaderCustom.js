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

  const [whoAmI, setwhoAmI] = useState("");

  const checkAccount = async () => {
    const acc = await web3.eth.getAccounts();
    const admin = await delivery.methods.admin().call();
    if (admin == acc[0]) {
      setwhoAmI("admin");
    } else if (acc[0]) {
      setwhoAmI("user");
    }
  };

  const onHome = () => {
    router.push("/");
  };

  useEffect(() => {
    checkAccount();
    // console.log(whoAmI);
  }, []);

  const who = {
    admin: "75%",
    user: "60%",
    "": "75%",
  };

  return (
    <Header
      className={styles.sticky}
      style={{
        // background: "rgba(255, 255, 255)",
        height: "90px",
        boxShadow: "0px 1px 1px rgba(235, 235, 235, 1.0)",
        marginBottom: "5px",
        // position : "fixed"
      }}
    >
      <div className={styles.logo} onClick={onHome} />
      <a href="https://www.facebook.com/zakariahossain.foysal" target="_blank">
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
      </a>

      <a href="https://twitter.com/Zakariafoysal20" target="_blank">
        <TwitterOutlined
          style={{
            float: "right",
            fontSize: "30px",
            color: "#00acee",
            marginTop: "28px",
            marginRight: "20px",
            cursor: "pointer",
          }}
        />
      </a>
      <Menu
        className={styles.menu}
        onClick={menuClicked}
        theme="black"
        mode="horizontal"
        style={{
          // float: "right",
          border: 0,
          marginLeft: who[whoAmI],
          marginTop: "10px",
          background: "rgba(0, 0, 0, 0)",
          color: "white",
        }}
        // defaultSelectedKeys={[props.menu]}
      >
        {(whoAmI === "user" || whoAmI === "admin") && (
          <Menu.Item key="1">Home</Menu.Item>
        )}
        {whoAmI == "user" && <Menu.Item key="3">Courier</Menu.Item>}
        {whoAmI == "user" && <Menu.Item key="4">Shipping</Menu.Item>}
        {whoAmI === "user" && <Menu.Item key="5">Tracking</Menu.Item>}
        {whoAmI == "admin" && <Menu.Item key="2">All Quotes</Menu.Item>}
      </Menu>
    </Header>
  );
};

export default HeaderCustom;
