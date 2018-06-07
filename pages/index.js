import React, { Component } from 'react';
import EtherMantras from '../ethereum/ethermantra';
import { Card, Button, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Mantra from '../components/Mantra';
import KarmaPoints from '../components/KarmaPoints';
import { Link } from '../routes';

class MantraIndex extends Component {
  state = {
    errorMessage: ''
  };

  // static is required by next, so it can call the method without rendering the component
  static async getInitialProps() {
    const mantrasCount = await EtherMantras.methods.getMantrasNumber().call();

    const mantras = await Promise.all(
      Array(parseInt(mantrasCount))
        .fill()
        .map((element, index) => {
          return EtherMantras.methods.mantras(index).call();
        })
    );

    return { mantras, mantrasCount };
  }

  handleError = msg => {
    this.setState({ errorMessage: msg });
  };

  // key and mkey are two separate props because react requires the key prop but doesn't
  // expose it to the component
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
          <h3>Mantras</h3>
          {this.renderMantras()}
          {this.state.errorMessage && (
            <Message error header="Oops!" content={this.state.errorMessage} />
          )}
        </div>
      </Layout>
    );
  }
}

export default MantraIndex;
