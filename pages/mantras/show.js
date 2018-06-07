import React, { Component } from 'react';
import EtherMantras from '../../ethereum/ethermantra';
import { Card, Button, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Mantra from '../../components/Mantra';

class MantrasShow extends Component {
  state = {
    errorMessage: ''
  };

  static async getInitialProps(props) {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const mantrasCount = await EtherMantras.methods.getMantrasNumber().call();

    const allMantras = await Promise.all(
      Array(parseInt(mantrasCount))
        .fill()
        .map((element, index) => {
          return EtherMantras.methods.mantras(index).call();
        })
    );

    const mantras = [];
    for (let i = 0; i < allMantras.length; i++) {
      const owner = await EtherMantras.methods
        .mantraOwner(allMantras[i].key)
        .call();
      console.log(
        `owner=${owner} acc=${accounts[0]} pushing=${owner == accounts[0]}`
      );
      if (owner == accounts[0]) {
        console.log('pushing some shit');
        mantras.push(allMantras[i]);
      }
    }
    return { account: accounts[0], address: props.query.address, mantras };
  }

  handleError = msg => {
    //this.setState({ errorMessage: msg });
    pass;
  };

  renderMantras() {
    return (
      <Card.Group>
        {this.props.mantras.map(mantra => {
          return (
            <Mantra
              description={mantra.description}
              karmaPerBlock={mantra.karmaPerBlock}
              key={mantra.key}
              mkey={mantra.key}
              errHandler={this.handleError}
            />
          );
        })}
      </Card.Group>
    );
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Your Mantras</h3>
          {this.renderMantras()}
          {this.state.errorMessage && (
            <Message error header="Oops!" content={this.state.errorMessage} />
          )}
        </div>
      </Layout>
    );
  }
}

export default MantrasShow;
