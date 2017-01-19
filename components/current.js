import React, { Component } from 'react';

import App from './app';
import CurrentInner from './current_inner';
import DemoScreen from './demo_screen'

class Current extends Component {

  constructor() {
    super();
    this.state = {
      demoPhase: 1
    };
  }

  url = '/api/bubbles';

  render() {

    if(this.state.demoPhase===4||this.props.params.tut_phase==="done") {
      return (
        <App>
          <CurrentInner />
        </App>
      );
    } else if (this.state.demoPhase===1){
      return (
        <div id="demo-wrapper">
          <DemoScreen next={this.next1}>
            <div className="demo-1">
              <p>Hi! </p>
              <p> <strong>pop task</strong> can be used to manage daily tasks and track time with a minimum of distraction. It was created using React, Express, and Mongoose. </p>
            </div>
          </DemoScreen>
          <App>
            <CurrentInner />
          </App>
        </div>
      );
    } else if (this.state.demoPhase===2) {
      return (
        <div id="demo-wrapper">
          <DemoScreen next={this.next2}>
            <div className="demo-1">
              <p>The main screen is for tasks that you are working on today. To start a new task, enter details as desired and click <strong>blow bubble</strong>. </p>
              <p>Once you have a bubble task, you can edit, delete, or start timing your progress.</p>
            </div>
          </DemoScreen>
          <App>
            <CurrentInner />
          </App>
        </div>
      );
    } else if (this.state.demoPhase===3) {
      return (
        <div id="demo-wrapper">
          <DemoScreen next={this.next3}>
            <div className="demo-1">
              <p>Once finished, click <strong>pop</strong> to complete a task. You can click <strong>popped</strong> to view a record of all completed tasks. </p>
              <p> To take note of a task to be completed another day, click <strong>backlog</strong> to go to the backlog screen. Bubbles in the backlog can be moved to the current screen manually, or they can move automatically if you select a due date. </p>
              <p> Thanks and enjoy!</p>
            </div>
          </DemoScreen>
          <App>
            <CurrentInner />
          </App>
        </div>
      );
    }

  }

  componentDidMount = () => {
    if (this.state.demoPhase===1&&this.props.params.tut_phase!=="done"){
      fetch('/api/bubbles/all', {
        method: 'DELETE'
      })
      .catch((error) => {
        console.log(error);
        this.props.onError(error);
      });
      fetch('/api/backlog/all', {
        method: 'DELETE'
      })
      .catch((error) => {
        console.log(error);
        this.props.onError(error);
      });
      fetch('/api/popped/all', {
        method: 'DELETE'
      })
      .catch((error) => {
        console.log(error);
        this.props.onError(error);
      });
    }

  }

  next1 = () => {
    this.setState({
      demoPhase: 2
    });
  }

  next2 = () => {
    this.setState({
      demoPhase: 3
    });
  }

  next3 = () => {
    this.setState({
      demoPhase: 4
    });
  }

}

export default Current;
