//NPM scripts
import React from "react";
import Head from 'next/head';

//Own Scripts
import delivery from "../../Ethereum/delivery.js";

//CSS imports
import "antd/dist/antd.css";

import { Form, Select, Switch, Slider, Button, InputNumber } from "antd";
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
        <title>New Courier Request</title>
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
        {/* <h1 style={{ textAlign: "center", margin: "50px" }}>
          Courier Delivery Quote
        </h1> */}

        <Form.Item
          name="height"
          label="Height (cm)"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Put Values..",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue="1"
            min="1"
            // onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="width"
          label="Width (cm)"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Put Values..",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue="1"
            min="1"
            // onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="Depth"
          label="Depth (cm)"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Put Values..",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue="1"
            min="1"
            // onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Weight (kg)"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Put Values..",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            defaultValue="1"
            min="1"
            // onChange={onChange}
          />
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
          name="Type of Service"
          label="Type of Service"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select..",
            },
          ]}
        >
          <Select placeholder="Please select..">
            <Option value="1">Regular</Option>
            <Option value="2">Same Day</Option>
            <Option value="3">Direct</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Add Insurance"
          label="Add Insurance"
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
