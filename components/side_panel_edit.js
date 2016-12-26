import React, { Component } from 'react';

class SidePanelEdit extends Component {
  render() {
      // console.log('this.props.editBubble in SidePanelEdit');
      // console.log(this.props.editBubble);

      return (
      <div className="sidepanel">
        <div>
            name :
            <input id="name" value={this.props.editBubble.name} onChange={(evt)=>this.props.updateEditBubble("name", evt) } type="text"  />
        </div>
        <div>
            duration:
            <input id="duration_seconds" value={this.props.editBubble.duration_seconds/60} onChange={(evt)=>this.props.updateEditBubble("duration_seconds", evt)} type="number" />
        </div>
        <div>
            due date:
            <input id="duedate" value={this.props.editBubble.duedate} onChange={ (evt)=>this.props.updateEditBubble("duedate", evt) } type="date" />
        </div>
        <div>
            priority :
            <select id="priority" value={this.props.editBubble.priority} onChange={(evt)=>this.props.updateEditBubble("priority", evt)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
        <div className="centerChildren">
            <button className="btn" onClick={()=>this.editBubble()}>update</button>
        </div>
      </div>)
  }

  editBubble = () =>{
    fetch(this.props.url + '/' + this.props.editBubble._id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props.editBubble)
    })
    .then((response)=> {
      this.props.onRefresh();
    })
    .catch((error) => {
      this.props.onError(error);
    });

    this.props.resetEditBubble();
  }
}

export default SidePanelEdit;
