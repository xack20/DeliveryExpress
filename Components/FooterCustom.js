import React from "react";

import { Layout } from "antd";

import "antd/dist/antd.css";

const { Footer } = Layout;

const FooterCustom = () => {
  return (
    <Footer style={{ textAlign: "center" ,backgroundColor : 'black'}} >
      <p style={{color : 'white'}}>DeliveryExpress ©2021 Created by Zakaria</p>
    </Footer>
  );
};

export default FooterCustom;
