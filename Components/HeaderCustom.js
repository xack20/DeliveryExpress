import React, { useState } from "react";

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

  return (
    <Header
      className={styles.sticky}
      style={{
        background: "#fff",
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
          float: "right",
          border: 0,
          marginTop: "10px",
          marginRight: "80px",
        }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="3">Courier</Menu.Item>
        <Menu.Item key="4">Shipping</Menu.Item>
        <Menu.Item key="5">Tracking</Menu.Item>
        <Menu.Item key="2">All Quotes</Menu.Item>
        
      </Menu>
    </Header>
  );
};

export default HeaderCustom;
