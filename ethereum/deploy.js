const provider = require('./hdwallet');

const Web3 = require('web3');
const compiledEtherMantra = require('./build/EtherMantra.json');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledEtherMantra.interface)
  )
    .deploy({ data: '0x' + compiledEtherMantra.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
