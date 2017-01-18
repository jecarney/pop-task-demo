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
              <p>
                <button className="btn" onClick={()=>this.props.editInit(this.props.activeBubble)}>Edit</button>
                <button className="btn" onClick={()=>this.onDelete(this.props.activeBubble.id)}>Delete</button>
                {this.props.isCurrent &&
                    <span><button className="btn" onClick={()=>this.popBubble(this.props.activeBubble)}>Pop</button>
                    <button className="btn" onClick={()=>this.props.toggleTimer(this.props.activeBubble)}>Timer</button></span>
                 }
                 {!this.props.isCurrent &&
                     <button className="btn" onClick={()=>this.props.makeCurrent(this.props.activeBubble)}>Move to Current</button>
                  }
              </p>
            </div>
            );
          }

    onDelete = (id) => {
      fetch(this.props.url + '/' + this.props.activeBubble._id, {
        method: 'DELETE'
      })
      .then((response)=> {
        this.props.onRefresh();
        this.props.resetDetails();
      })
      .catch((error) => {
        console.log(error);
        this.props.onError(error);
      });
    }

    fetchHelper = (url, method, body, then1, then2) => {

      fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      })
      .then((response)=> {
          then1(response);
      })
      .then((response)=>{
          then2? then2():null;
      })
      .catch((error) => {
        console.log(error);
        this.onError(error);
      });
    }

    popBubble = (bubble) =>{

      var then1 = () => {
        fetch('/api/popped', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(bubble)
       })
      }

      var then2 = () => {
        this.setState({
          popActive: false
        });
         this.props.onRefresh(this.url);
      }

      this.fetchHelper ('/api/bubbles' + '/' + bubble._id, 'DELETE', {}, then1, then2);
    }
}

export default SidePanelDetails;
