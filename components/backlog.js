import React, { Component } from 'react';

import App from './app';
import BackLogInner from './backlog_inner';

class BackLog extends Component {
  constructor() {
    super();
    this.state = {
      noRefresh: false
    };
  }
  render() {
    return (
      <App noRefresh={this.state.noRefresh}>
        <BackLogInner/>
      </App>
    );
  }
}

export default BackLog;
