import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0xc3FFa56678c2fD83265b5bf71Ac1103163E8c94d'
);

export default instance;
