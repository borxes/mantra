import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import EtherMantras from '../ethereum/ethermantra';

const KARMA_INTERVAL = 10000;

class KarmaPoints extends Component {
  state = {
    points: 0
  };

  setKarmaPoints = async () => {
    let points = 0;
    try {
      const accounts = await web3.eth.getAccounts();
      points = await EtherMantras.methods.getKarmaPoints(accounts[0]).call();
    } catch (err) {
      console.log(err.message);
    }

    this.setState({ points: points });
  };

  async componentDidMount() {
    this.setKarmaPoints();
    this.interval = setInterval(() => this.setKarmaPoints(), KARMA_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="KarmaPoints">
        <strong>You've earned {this.state.points} Karma Points!</strong>
      </div>
    );
  }
}

export default KarmaPoints;
