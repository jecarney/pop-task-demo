import React, { Component } from 'react';
import Moment from 'moment';

class SidePanelDetails extends Component {
  render() {
        var format_duedate = Moment(this.props.activeBubble.duedate).format('YYYY-MM-DD');
        return (
            <div className="sidepanel">
              <div>
                <strong>name: </strong>{(this.props.activeBubble.name!==undefined&&this.props.activeBubble.name!=='')?this.props.activeBubble.name:''}
              </div>
              <div>
                <strong>duration: </strong>{(this.props.activeBubble.duration_seconds!==undefined&&this.props.activeBubble.duration_seconds!=='')?Math.round(this.props.activeBubble.duration_seconds/60) + ' minutes':''}
              </div>
              <div>
                <strong>priority: </strong>{(this.props.activeBubble.priority!==undefined&&this.props.activeBubble.priority!=='')?this.props.activeBubble.priority:''}
              </div>
              <div>
                <strong>due date:</strong>{(this.props.activeBubble.duedate!==undefined&&this.props.activeBubble.duedate!=='')?format_duedate:''}
              </div>
            </div>
            );
          }
}

export default SidePanelDetails;
