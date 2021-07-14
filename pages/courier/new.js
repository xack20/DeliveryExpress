//NPM scripts
import React, { useState } from "react";
import Head from "next/head";
import web3 from "../../Ethereum/web3";
import time from "../../utils/time";
import router from "next/router";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";

//CSS imports
import "antd/dist/antd.css";

import {
  Form,
  Select,
  Switch,
  Slider,
  Button,
  InputNumber,
  Spin,
  message,
  notification,
  Descriptions
} from "antd";
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
  const [loading, setloading] = useState(false);

  const onFinish = async (values) => {
    setloading(true);

    const acc = await web3.eth.getAccounts();

    if(values['insurance'] === undefined) values['insurance'] = false;

    const back = await delivery.methods
      .addCourier(
        0,
        values["height"],
        values["width"],
        values["depth"],
        values["weight"],
        values["distance"],
        values["tos"],
        values["insurance"],
        time
      )
      .send({ from: acc[0] });

    // console.log(back);

    notification.success({
      message: `Request Approved`,
      description: (
        <div>
          <p><b>Status : </b>{back.status}</p>
          <p><b>From : </b>{back.from}</p>
          <p><b>To : </b>{back.to}</p>
          <p><b>GasUsed : </b>{back.gasUsed}</p>
          <p><b>TrasactionHash : </b>{back.transactionHash}</p>
        </div>
      ),
      placement: "bottomRight",
    });

    // message.success({
    //   content: "Request Accepted!",
    //   style: { marginTop: "10vh" },
    //   duration: 1,
    // });
    setloading(false);

    router.push("/courier");
  };

  return (
    <LayoutCustom>
      <Head>
        <title>New Courier Request</title>
        {/* <link rel="shortcut icon" href="../../images/favicon.png" /> */}
      </Head>

      <Spin size="large" tip="loading..." spinning={loading}>
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
              // defaultValue="1"
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
              // defaultValue="1"
              min="1"
              // onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            name="depth"
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
              // defaultValue="1"
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
              // defaultValue="1"
              min="1"
              // onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            name="distance"
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
            name="tos"
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
              <Option value="2">SameDay</Option>
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
      </Spin>
    </LayoutCustom>
  );
};


export default CreateQuote;
