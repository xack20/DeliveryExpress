//NPM scripts
import React, { useState } from "react";
import Head from "next/head";

//Own Scripts
import delivery from "../../Ethereum/delivery.js";
import web3 from "../../Ethereum/web3";
import router from "next/router";

//CSS imports
import "antd/dist/antd.css";

import {
  Form,
  Select,
  Switch,
  Slider,
  Button,
  Spin,
  message,
  Descriptions,
  notification,
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

    try {
      const acc = await web3.eth.getAccounts();

      if (values["refrigerated"] === undefined) values["refrigerated"] = false;
      if (values["hazardous"] === undefined) values["hazardous"] = false;
      if (values["flatbed"] === undefined) values["flatbed"] = false;
      if (values["ressidentialPickup"] === undefined)
        values["ressidentialPickup"] = false;
      if (values["ressidentialDelivery"] === undefined)
        values["ressidentialDelivery"] = false;

      console.log(values);

      const back = await delivery.methods
        .addShipping(
          0,
          values["tlt"],
          values["distance"],
          values["toc"],
          values["flatbed"],
          values["refrigerated"],
          values["hazardous"],
          values["ressidentialPickup"],
          values["ressidentialDelivery"],
          new Date().toLocaleString()
        )
        .send({ from: acc[0] });

      notification.success({
        message: `Request Approved`,
        description: (
          <div>
            <p>
              <b>Status : </b>
              {back.status}
            </p>
            <p>
              <b>From : </b>
              {back.from}
            </p>
            <p>
              <b>To : </b>
              {back.to}
            </p>
            <p>
              <b>GasUsed : </b>
              {back.gasUsed}
            </p>
            <p>
              <b>TrasactionHash : </b>
              {back.transactionHash}
            </p>
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
    } catch (error) {
      notification.error({
        message: `Request Rejected`,
        description: (
          <div>
            <p>
              <b>Status : </b>
              {error.status}
            </p>
            <p>
              <b>From : </b>
              {error.from}
            </p>
            <p>
              <b>To : </b>
              {error.to}
            </p>
            <p>
              <b>GasUsed : </b>
              {error.gasUsed}
            </p>
            <p>
              <b>TrasactionHash : </b>
              {error.transactionHash}
            </p>
          </div>
        ),
        placement: "bottomRight",
      });
      setloading(false);
    }

    setloading(false);

    router.push("/shipping");
  };

  return (
    <LayoutCustom>
      <Head>
        <title>New Shipping Request</title>
        {/* <link rel="shortcut icon" href="../../images/favicon.ico" /> */}
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
          {/* <h1 style={{ textAlign: "center", margin: "50px" }}>Shipping Quote</h1> */}

          <Form.Item
            name="tlt"
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
            name="toc"
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

          <Form.Item name="flatbed" label="Flatbed" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            name="refrigerated"
            label="Refrigerated"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="hazardous" label="Hazardous" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            name="residentialPickup"
            label="Residential Pickup"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="residentialDelivery"
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
      </Spin>
    </LayoutCustom>
  );
};

export default CreateQuote;
