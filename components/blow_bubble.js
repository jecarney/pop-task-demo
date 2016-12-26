import React, { Component } from 'react';

class BlowBubble extends Component {
  render() {
    return (
      <div className="blow clearfix widget">
          <h3>blow bubble</h3>
              <div>
                  name :
                  <input id="name" value={ this.props.newBubble.name} onChange={(evt)=>this.props.updateNewBubble("name", evt) } type="textbox"  />
              </div>
              <div>
                  due date:
                  <input id="duedate" value={ this.props.newBubble.duedate} onChange={ (evt)=>this.props.updateNewBubble("duedate", evt) } type="date" />
              </div>
              <div>
                  priority :
                  <select id="priority" value={this.props.newBubble.priority} onChange={(evt)=>this.props.updateNewBubble("priority", evt)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                  </select>
              </div>

          <div className="centerChildren">
              <button className="btn" onClick={()=>this.props.submitNewBubble()}>Blow Bubble</button>
          </div>
      </div>
    );
  }
}

export default BlowBubble;
