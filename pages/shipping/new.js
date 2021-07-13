//NPM scripts
import React from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";

//CSS imports
import "antd/dist/antd.css";

import { Form, Select, Switch, Slider, Button } from "antd";
import LayoutCustom from "../../Components/LayoutCustom.js";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const CreateQuote = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <LayoutCustom>
      <Head>
        <title>New Shipping Request</title>
        {/* <link rel="shortcut icon" href="../../images/favicon.ico" /> */}
      </Head>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{
          marginTop: "10px",
          marginBottom: "50px",
          marginRight: "50px",
          background: "white",
          padding: "50px 0px",
        }}
      >
        {/* <h1 style={{ textAlign: "center", margin: "50px" }}>Shipping Quote</h1> */}

        <Form.Item
          name="FTL Truckload Type"
          label="FTL Truckload Type"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select..",
            },
          ]}
        >
          <Select placeholder="Please select..">
            <Option value="1">20ft</Option>
            <Option value="2">40ft</Option>
            <Option value="3">45ft</Option>
            <Option value="4">53ft</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="slider"
          label="Distance"
          rules={[
            {
              required: true,
              message: "Please select..",
            },
          ]}
        >
          <Slider
            max={500}
            marks={{
              0: "0",
              50: "50",
              100: "100",
              200: "200",
              300: "300",
              500: "500",
            }}
          />
        </Form.Item>

        <Form.Item
          name="Type of Commodity"
          label="Type of Commodity"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select..",
            },
          ]}
        >
          <Select placeholder="Please select..">
            <Option value="1">General Marchandise</Option>
            <Option value="2">Fragile Goods</Option>
            <Option value="3">Fine Arts</Option>
            <Option value="4">Hazardous Goods</Option>
          </Select>
        </Form.Item>

        <Form.Item name="Flatbed" label="Flatbed" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="Refrigerated"
          label="Refrigerated"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item name="Hazardous" label="Hazardous" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="Residential Pickup"
          label="Residential Pickup"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="Residential Delivery"
          label="Residential Delivery"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
            offset: 12,
          }}
          style={{ marginTop: 30 }}
        >
          <Button type="primary" htmlType="submit" ghost>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LayoutCustom>
  );
};

// CreateQuote.getInitialProps = async () => {
//   const admin = await delivery.methods.admin().call();

//   return { admin };
//   // return {test : 'Good to go!'}
// };

export default CreateQuote;
