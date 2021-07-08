const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const DeliveryExpress = require('../build/DeliveryExpress.json');

let accounts;
let delevery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    delevery = await new web3.eth.Contract(JSON.parse(DeliveryExpress.interface))
      .deploy({ data: DeliveryExpress.bytecode })
      .send({ from: accounts[0], gas: '3000000' });
});


describe('DeleveryExpress', () => {
    it('deploys a DeleveryExpress Contract', () => {
      assert.ok(delevery.options.address);
    });

    
});
  