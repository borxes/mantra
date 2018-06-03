import web3 from './web3';
import EtherMantra from './build/EtherMantra.json';

const instance = new web3.eth.Contract(
  JSON.parse(EtherMantra.interface),
  '0x7c917F1400f05c03882c5FAB5Eb9622c659E48F5'
);

export default instance;
