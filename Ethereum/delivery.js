import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0x15C72Beb583557009a3b84CBC8011E82443538c0'
);

export default instance;
