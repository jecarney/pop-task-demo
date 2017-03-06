import React, { Component } from 'react';

import App from './app';
import CurrentInner from './current_inner';
import DemoScreen from './demo_screen'

class Current extends Component {

  constructor() {
    super();
    this.state = {
      demoPhase: 1,
      noRefresh: false
    };
  }

  url = '/api/bubbles';

  render() {

    if (this.props.params.tut_phase==="Tutorial") {

      if (this.state.demoPhase===1){
        return (
          <div id="demo-wrapper">
            <DemoScreen next={this.next1}>
              <div className="demo-1">
                <p>Hi! </p>
                <p> <strong>pop task</strong> can be used to manage daily tasks and track time with a minimum of distraction. It was created using React, Express, and Mongoose. </p>
              </div>
            </DemoScreen>
            <App noRefresh={this.state.noRefresh}>
              <CurrentInner />
            </App>
          </div>
        );
      } else if (this.state.demoPhase===2) {
        return (
          <div id="demo-wrapper">
            <DemoScreen next={this.next2}>
              <div className="demo-1">
                <p>The main screen is for today's tasks. To start a new task, enter details and click <strong>blow bubble</strong>. </p>
                <p>Once you have a task, you can edit, delete, or start timing your progress.</p>
                <p>Click <strong>pop</strong> to move a task to the <strong>popped</strong> screen, where you can view all completed tasks. </p>
              </div>
            </DemoScreen>
            <App noRefresh={this.state.noRefresh}>
              <CurrentInner />
            </App>
          </div>
        );
      } else if (this.state.demoPhase===3) {
        return (
          <div id="demo-wrapper">
            <DemoScreen next={this.next3}>
              <div className="demo-1">
                <p> To take note of a task to be completed another day, click <strong>backlog</strong> to go to the backlog screen. Bubbles in the backlog can be moved to the current screen manually, or they can move automatically if you select a due date. </p>
                <p> Thanks and enjoy!</p>
              </div>
            </DemoScreen>
            <App noRefresh={this.state.noRefresh}>
              <CurrentInner />
            </App>
          </div>
        );
      }

    }else {
      return (
        <App noRefresh={this.state.noRefresh}>
          <CurrentInner />
        </App>
      );
    }

  }

  componentWillMount = () => {
    if (this.state.demoPhase===1&&this.props.params.tut_phase!=="done"){
      this.setState({
        noRefresh: true
      });
    }else {
      this.setState({
        noRefresh: false
      });
    }

  }

  componentDidMount = () => {
    if (this.state.demoPhase===1&&this.props.params.tut_phase!=="done"){
      fetch('/api/bubbles/all', {
        method: 'DELETE'
      }).then((response)=> {
        this.setState({
          noRefresh: false
        });
        // this.props.onRefresh('/api/bubbles');
      }).catch((error) => {
        console.log(error);
        // this.props.onError(error);
      });

      fetch('/api/backlog/all', {
        method: 'DELETE'
      }).then((response)=> {
        // this.props.onRefresh('/api/backlog');
      }).catch((error) => {
        console.log(error);
        // this.props.onError(error);
      });

      fetch('/api/popped/all', {
        method: 'DELETE'
      }).then((response)=> {
        // this.props.onRefresh('/api/popped');
      }).catch((error) => {
        console.log(error);
        // this.props.onError(error);
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
      this.props.params.tut_phase="done";
      this.setState({
        demoPhase: 1
      });
  }

}

export default Current;
