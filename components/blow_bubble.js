import React, { Component } from 'react';
import 'react-date-picker/index.css'
import { DatePicker, DateField, Calendar } from 'react-date-picker'

class BlowBubble extends Component {
  render() {
    return (
      <div className="blow clearfix widget">
          <h3>blow bubble</h3>
              <div>
                  <label>name :</label>
                  <input id="name" value={ this.props.newBubble.name} onChange={(evt)=>this.props.updateNewBubble("name", evt) } type="textbox"  />
              </div>
              <div>
                  <label id="datespan">due date:</label>
                  <DateField dateFormat="YYYY-MM-DD" forceValidDate={true} value={this.props.newBubble.duedate} updateOnDateClick={true} collapseOnDateClick={true} >
                    <DatePicker navigation={true} locale="en" forceValidDate={true} highlightWeekends={false} highlightToday={true} weekNumbers={false} weekStartDay={1} onChange={this.dateOnChange} />
                  </DateField>
              </div>
              <div>
                  <label>priority :</label>
                  <select id="priority" value={this.props.newBubble.priority} onChange={(evt)=>this.props.updateNewBubble("priority", evt)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                  </select>
              </div>

          <div className="centerChildren">
              <button className="btn" onClick={()=>this.props.submitNewBubble()}>blow bubble</button>
          </div>
      </div>
    );
  }

  updateNewBubble = (key, event) => {
    var newBubble = this.state.newBubble;
    newBubble[key] = event.target.value;
    this.setState({newBubble: newBubble });
  }

  dateOnChange = (dateString, { dateMoment, timestamp }) => {
    var evt = {}
    evt["target"] = {"value": timestamp};
    this.props.updateNewBubble("duedate", evt)
  }
}




export default BlowBubble;
