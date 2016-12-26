import React, { Component } from 'react';

import App from './app';
import BackLogInner from './backlog_inner';

class BackLog extends Component {
  render() {
    return (
      <App>
        <BackLogInner/>
      </App>
    );
  }
}

export default BackLog;
