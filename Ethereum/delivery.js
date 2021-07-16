import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0xb660952d915B41Ba63EaA20615E67F68f8147c04'
);

export default instance;
