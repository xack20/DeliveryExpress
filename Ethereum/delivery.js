import web3 from './web3';
import DeliveryExpress from './build/DeliveryExpress.json';

const instance = new web3.eth.Contract(
  JSON.parse(DeliveryExpress.interface),
  '0x647f21a13665cD3739f4655b7f579B19231FEB40'
);

export default instance;
