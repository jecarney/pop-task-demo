import React, { Component } from 'react';

class DeleteBubble extends Component {
  render() {
        return (
            <div className="widget">
              <h3>delete bubble</h3>
              <button className="btn" onClick={this.props.toggleDelete}>Delete</button>
            </div>
            );
        }
      }

export default DeleteBubble;
