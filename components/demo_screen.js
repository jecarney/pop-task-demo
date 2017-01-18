import React, { Component } from 'react';

class DemoScreen extends Component {
  render() {
        return (
            <div id="demo-wrap">
              {this.props.children}
              <button className="btn" onClick={this.props.next}>Next</button>
            </div>
            );
        }
      }

export default DemoScreen;
