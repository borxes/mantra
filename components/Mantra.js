import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import EtherMantras from '../ethereum/ethermantra';

const MANTRA_INTERVAL = 10000;

// receives description, mkey, KPH as props
class Mantra extends Component {
  state = {
    loading: false,
    owned: false
  };

  componentDidMount() {
    this.setOwned();
    this.interval = setInterval(() => this.setOwned(), MANTRA_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async setOwned() {
    let owned = false;
    let message = '';
    try {
      const accounts = await web3.eth.getAccounts();
      const owner = await EtherMantras.methods
        .mantraOwner(this.props.mkey)
        .call();
      owned = owner == accounts[0];
    } catch (err) {
      this.props.errHandler(err.message);
    }
    this.setState({ owned });
  }

  handleClick = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await EtherMantras.methods
        .receiveMantra(this.props.mkey)
        .send({ from: accounts[0] });
    } catch (err) {
      this.props.errHandler(err.message);
    }

    this.setState({ loading: false });
  };

  render() {
    const button = this.state.owned ? (
      <Button disabled>Get this Mantra</Button>
    ) : (
      <Button primary loading={this.state.loading} onClick={this.handleClick}>
        Get this Mantra
      </Button>
    );
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.description}</Card.Header>
          <Card.Meta>{`${this.props.karmaPerBlock} karma per block`}</Card.Meta>
          <Image src="/static/ommanipadmehum.png" />
        </Card.Content>
        <Card.Content extra>{button}</Card.Content>
      </Card>
    );
  }
}

export default Mantra;
