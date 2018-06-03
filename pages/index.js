import React, { Component } from 'react';
import EtherMantras from '../ethereum/ethermantra';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
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

  renderMantras() {
    const items = this.props.mantras.map(mantra => {
      return {
        header: mantra.description,
        description: (
          <Link route={`/mantras/${mantra.key}`}>
            <a>View Campaign</a>
          </Link>
        ),
        karmaPerHour: mantra.karmaPerHour,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
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
