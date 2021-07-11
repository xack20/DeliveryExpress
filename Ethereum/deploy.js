const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const deliveryContract = require('./build/DeliveryExpress.json');

const provider = new HDWalletProvider(
  'ask lizard organ napkin wisdom wall heavy music protect elite bullet replace',
  'https://rinkeby.infura.io/v3/da446e42bc684f7392db6332b007068f'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(deliveryContract.interface)
  )
    .deploy({ data: deliveryContract.bytecode })
    .send({ gas: '3000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
