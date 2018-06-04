import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import EtherMantras from '../ethereum/ethermantra';

class KarmaPoints extends Component {
  state = {
    points: 0
  };

  async componentDidMount() {
    // calculate points
    // await ...
    let points = 0;
    try {
      const accounts = await web3.eth.getAccounts();
      points = await EtherMantras.methods.getKarmaPoints(accounts[0]).call();
    } catch (err) {
      console.log(err.message);
    }

    this.setState({ points: points });
  }

  render() {
    return <div>You've earned {this.state.points} Karma Points!!!</div>;
  }
}

export default KarmaPoints;
