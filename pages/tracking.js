//NPM scripts
import React from "react";

//Own Scripts
import delivery from "../Ethereum/delivery.js";
import LayoutCustom from "../Components/LayoutCustom.js";

//CSS imports
import "antd/dist/antd.css";
import styles from "./index.module.css";


const tracking = (props) => {
  return (
    <LayoutCustom>
      <div className={styles.siteLayoutContent}>Tracking Page</div>
    </LayoutCustom>
  );
};

tracking.getInitialProps = async () => {
  const admin = await delivery.methods.admin().call();

  return { admin };
  // return {test : 'Good to go!'}
};

export default tracking;
