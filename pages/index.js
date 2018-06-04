import React, { Component } from 'react';
import EtherMantras from '../ethereum/ethermantra';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Mantra from '../components/Mantra';
import { Link } from '../routes';

class MantraIndex extends Component {
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

  // key and mkey are two separate props because react requires the key prop but doesn't
  // expose it to the component
  renderMantras() {
    return (
      <Card.Group>
        {this.props.mantras.map(mantra => {
          return (
            <Mantra
              description={mantra.description}
              karmaPerHour={mantra.karmaPerHour}
              key={mantra.key}
              mkey={mantra.key}
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
        </div>
      </Layout>
    );
  }
}

export default MantraIndex;
