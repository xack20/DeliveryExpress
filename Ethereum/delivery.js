import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0xD75ca7A252C5098F9cccF36c03701AAa7fc76be3'
);

export default instance;
