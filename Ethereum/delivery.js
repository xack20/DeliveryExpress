import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0x8acb4ed9522c1385e2d284546ab6a38f6fd2f3bb'
);

export default instance;
