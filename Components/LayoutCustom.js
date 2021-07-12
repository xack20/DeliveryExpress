//NPM scripts
import React from "react";


//CSS imports
import "antd/dist/antd.css";

import { Layout } from 'antd';
import HeaderCustom from "./HeaderCustom.js";
import FooterCustom from "./FooterCustom.js";

const { Content } = Layout;

const LayoutCustom = (props) => {
  return (
    <Layout style={{background : "#fff"}}>
      
      <HeaderCustom/>

      <Content style={{ padding: "0 50px" }}>
        
        
        {props.children}

      </Content>
      
      <FooterCustom/>

    </Layout>
  );
};

export default LayoutCustom;
