import React, { Component } from 'react';

class PopBubble extends Component {
  render() {
        return (
            <div className="widget">
              <h3>pop bubble</h3>
              <button className="btn" onClick={this.props.togglePop}>Pop</button>
            </div>
            );
        }
      }

export default PopBubble;
