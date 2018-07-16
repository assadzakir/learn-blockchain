const HDWallerProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./compile");

const provider = new HDWallerProvider(
  "armor share excess bid pioneer air fall bench style color rapid about",
  "https://rinkeby.infura.io/h4zbZkgFeFbE6Im0rwP3"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account ${accounts[0]}`);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: "0x" + bytecode, arguments: ["default message!"] })
      .send({ from: accounts[0], gas: "1000000" });

    console.log(`Contract deployed to `, result.options.address);
  } catch (e) {
    console.log(e);
  }
};

deploy();
