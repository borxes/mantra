import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import EtherMantras from '../ethereum/ethermantra';

// receives description, mkey, KPH as props
class Mantra extends Component {
  state = {
    loading: false
  };

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
    console.log(this.props);
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.description}</Card.Header>
          <Card.Meta>{`${this.props.karmaPerBlock} karma per block`}</Card.Meta>
          <Image src="/static/ommanipadmehum.png" />
        </Card.Content>
        <Card.Content extra>
          <Button
            primary
            loading={this.state.loading}
            onClick={this.handleClick}
          >
            Get this Mantra
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default Mantra;
