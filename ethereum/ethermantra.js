import web3 from './web3';
import EtherMantra from './build/EtherMantra.json';

const instance = new web3.eth.Contract(
  JSON.parse(EtherMantra.interface),
  '0x25f41f0b3327a3818b7c09a0f551feaf9603aad2'
);

export default instance;
