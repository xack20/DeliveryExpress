//NPM scripts
import React from "react";

//Own Scripts
import delivery from "../Ethereum/delivery.js";

//CSS imports
import "antd/dist/antd.css";



const index = (props) => {
  

  return (
    <div>
        <h2>Welcome to landing page..</h2>
    </div>
  );
};

index.getInitialProps = async () => {
  const admin = await delivery.methods.admin().call();

  return { admin };
  // return {test : 'Good to go!'}
};

export default index;
