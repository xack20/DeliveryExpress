const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const DeliveryExpress = require('../Ethereum/build/DeliveryExpress.json');

let accounts;
let delivery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
  
    delivery = await new web3.eth.Contract(JSON.parse(DeliveryExpress.interface))
      .deploy({ data: DeliveryExpress.bytecode })
      .send({ from: accounts[0], gas: '3000000' });
});


describe('DeleveryExpress', () => {

    it('Check -> deploys a DeliveryExpress Contract', () => {
      assert.ok(delivery.options.address);
    });

    it("Check -> deployer is the system Admin", async () => {
      const admin = await delivery.methods.admin().call();
      assert.strictEqual(accounts[0],admin);
    })

    it('Check -> user can add a shipping request',async() =>{

    })

    it('Check -> user can add a courier request',async() =>{
      
    })

    it('Check -> user can view their shipping requests',async() =>{
      
    })

    it('Check -> user can view their courier requests',async() =>{
      
    })

    it('Check -> admin change the request approval flag',async() =>{
      
    })

    it('Check -> admin change the delivery tracking status',async() =>{
      
    })

    it('Check -> user can check their delivery tracking status',async() =>{
      
    })

    

    
});
  