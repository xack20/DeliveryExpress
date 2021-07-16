const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const DeliveryExpress = require("../Ethereum/build/DeliveryExpress.json");

let accounts;
let delivery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  delivery = await new web3.eth.Contract(JSON.parse(DeliveryExpress.interface))
    .deploy({ data: DeliveryExpress.bytecode })
    .send({ from: accounts[0], gas: "3000000" });
});

describe("DeleveryExpress", () => {
  it("Deploys a DeliveryExpress Contract", () => {
    assert.ok(delivery.options.address);
  });

  it("Deployer is the system Admin", async () => {
    const admin = await delivery.methods.admin().call();
    assert.strictEqual(accounts[0], admin);
  });

  it("User information check", async () => {
    await delivery.methods.setUserInfo("Xack","xack@gmail.com").send({ from: accounts[0] , gas: "3000000" });
    const userInfo = await delivery.methods.getUserInfo(accounts[0]).call({from : accounts[0] ,gas : "3000000" });
    assert.strictEqual("Xack", userInfo[0]);
  });



  it("Check -> user can add a shipping request", async () => {
    const ret1 = await delivery.methods
      .getShipping(accounts[0])
      .call({ from: accounts[0], gas: "3000000" });
    await delivery.methods
      .addShipping("1", "1", "1", true, true, true, true, true, "date")
      .send({ from: accounts[0], gas: "3000000" });
    const ret2 = await delivery.methods
      .getShipping(accounts[0])
      .call({ from: accounts[0], gas: "3000000" });
    assert.notStrictEqual(ret1.length, ret2.length);
  });

  it("Check -> user can add a courier request", async () => {
    const ret1 = await delivery.methods
      .getCourier(accounts[0])
      .call({ from: accounts[0], gas: "3000000" });
    await delivery.methods
      .addCourier( "1", "1", "1", "1", "1", "1", true, "date")
      .send({ from: accounts[0], gas: "3000000" });
    const ret2 = await delivery.methods
      .getCourier(accounts[0])
      .call({ from: accounts[0], gas: "3000000" });
    assert.notStrictEqual(ret1.length, ret2.length);
  });

  it("Check -> admin change the request approval flag", async () => {
    await delivery.methods
      .addCourier( "1", "1", "1", "1", "1", "1", true, "date")
      .send({ from: accounts[1], gas: "3000000" });
    await delivery.methods
      .setApproval("0", accounts[1], 3, 0)
      .send({ from: accounts[1], gas: "3000000" });
    const arr = await delivery.methods
      .getCourier(accounts[1])
      .call({ from: accounts[1], gas: "3000000" });
    assert.strictEqual(arr[1].approval, "0");
  });

  it("Check -> admin change the delivery tracking status", async () => {
    await delivery.methods
      .addCourier( "1", "1", "1", "1", "1", "1", true, "date")
      .send({ from: accounts[0], gas: "3000000" });
    await delivery.methods
      .setStatus(accounts[0], 0, "0", 0)
      .send({ from: accounts[0], gas: "3000000" });
    const status = await delivery.methods
      .getStatus(3, 0)
      .call({ from: accounts[0], gas: "3000000" });
    assert.notStrictEqual(status, "1");
  });

  it("Check -> admin set the cost of any service/order", async () => {
    await delivery.methods
      .addCourier( "1", "1", "1", "1", "1", "1", true, "date")
      .send({ from: accounts[0], gas: "3000000" });
    await delivery.methods
      .setCost(30, accounts[0], 3, 0)
      .send({ from: accounts[0], gas: "3000000" });
    const arr = await delivery.methods
      .getCourier(accounts[0])
      .call({ from: accounts[0], gas: "3000000" });
    assert.notStrictEqual(arr[6], "30");
  });

  it("Check -> admin can get all users list", async () => {
    
    const ret1 = await delivery.methods.getAllUsers().call({ from: accounts[0], gas: "3000000" });

    await delivery.methods.setUserInfo("Xack","xack@gmail.com").send({ from: accounts[0] , gas: "3000000" });
    
    const ret2 = await delivery.methods.getAllUsers().call({ from: accounts[0], gas: "3000000" });
    
    assert.notStrictEqual(ret1.length, ret2.length);
  });

  
  it("Check -> users payment method", async () => {
    await delivery.methods
      .addCourier("1", "1", "1", "1", "1", "1", true, "date")
      .send({ from: accounts[0], gas: "3000000" });

    await delivery.methods
      .setCost(web3.utils.toWei('1', 'ether'), accounts[0], 3, 0)
      .send({ from: accounts[0], gas: "3000000" });

    const prevBal = await web3.eth.getBalance(accounts[0]);

    await delivery.methods
      .makePayment(3, 0)
      .send({
        from: accounts[0],
        value: web3.utils.toWei("1.002", "ether"),
        gas: "3000000",
      });

    const newBal = await web3.eth.getBalance(accounts[0]);

    assert((prevBal - newBal) < web3.utils.toWei("1.003", "ether"));
  });
});
