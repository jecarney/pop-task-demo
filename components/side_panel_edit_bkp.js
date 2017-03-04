import React, { Component } from 'react';
import 'react-date-picker/index.css'
import { DatePicker, DateField, Calendar } from 'react-date-picker'

class SidePanelEdit extends Component {
  render() {
      return (
      <div className="sidepanel edit">
        <div>
            <label>name : </label>
            <input id="name" value={this.props.editBubble.name} onChange={(evt)=>this.props.updateEditBubble("name", evt) } type="text"  />
        </div>
        <div>
            <label>duration (mins): </label>
            <input id="duration_seconds" value={this.props.editBubble.duration_seconds/60} onChange={(evt)=>this.props.updateEditBubble("duration_seconds", evt)} type="number" />
        </div>
        <div>
            <label>due date : </label>
            <DateField dateFormat="YYYY-MM-DD" forceValidDate={true} value={this.props.editBubble.duedate} updateOnDateClick={true} collapseOnDateClick={true} >
              <DatePicker navigation={true} locale="en" forceValidDate={true} highlightWeekends={false} highlightToday={true} weekNumbers={false} weekStartDay={1} onChange={this.dateOnChange} />
            </DateField>
        </div>
        <div>
            <label>priority :</label>
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

  dateOnChange = (dateString, { dateMoment, timestamp }) => {
    var evt = {}
    evt["target"] = {"value": timestamp};
    this.props.updateEditBubble("duedate", evt)
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
      this.props.resetEditBubble();
    })
    .catch((error) => {
      this.props.onError(error);
    });
  }
}

export default SidePanelEdit;
