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
    // console.log(this.props.params.tut_phase);
    // if (this.props.params.tut_phase) {
    //
    //   this.setState({
    //     demoPhase: this.props.params.tut_phase
    //   });
    // }
    console.log(this.props.params.tut_phase);

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
              <p> Pop Task can be used to manage daily tasks and track time with a minimum of distraction. It was created using React, Express, and Mongoose. To begin, please click "Next". </p>
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
              <p>The main screen is for tasks that you are working on today. To start a new task, enter details as desired and click "blow bubble". Click the bubble when you begin working on that task to start timing - the bubble will wobble. Click again to stop timing, or click another bubble to start timing a different task. </p>
              <p>You do not need to enter any information to create a bubble and start timing - you can simply edit the bubble later. To edit, hover over a bubble and click "Edit". </p>
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
              <p>Once finished, click "pop" to complete a task. You can click "Popped" to view a record of all completed tasks. </p>
              <p> To take note of a task to be completed another day, click "Backlog" to go to the backlog screen. You can create new bubbles in the backlog, which can later be moved to the Current screen manually, or they can move automatically if you select a due date. </p>
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
    if (this.state.demoPhase===1&&this.props.params.tut_phase!=="4"){
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
