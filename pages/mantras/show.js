import React, { Component } from 'react';

class MantrasShow extends Component {
  static async getInitialProps(props) {
    return { address: props.query.address };
  }
}

export default MantrasShow;
