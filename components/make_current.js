import React, { Component } from 'react';

class MakeCurrent extends Component {
  render() {
        return (
            <div className="widget centerChildren ">
              <h3>move bubble to current</h3>
              <button className="btn" onClick={this.props.toggleMakeCurrent}>Move</button>
            </div>
            );
        }
      }

export default MakeCurrent;
