import React, { Component } from 'react';
import {Link} from 'react-router';

import BlowBubble from './blow_bubble';
import DeleteBubble from './delete_bubble';
import ShowBubbles from './show_bubbles.js';
import LogOut from './log_out.js'
import SidePanel from './side_panel.js';
import PopBubble from './pop_bubble'

class CurrentInner extends Component {
  constructor() {
    super();
    this.state = {
      popActive: false,
      isTiming: null
    };
  };

  url = '/api/bubbles';

  render() {
    return (
        <div className={this.isPopActive()}>
          <div className="left-column centerChildren">
            <div className="btn link">
              <Link to="/Popped"><span className='arrow'>&#9650;</span>popped</Link>
            </div>
            <BlowBubble newBubble={this.props.newBubble} updateNewBubble={this.props.updateNewBubble} submitNewBubble={() => this.props.submitNewBubble(this.url)} />
            <div className="btn link blog">
              <Link to="/Backlog"> <span className='arrow'>&#9660;</span>backlog</Link>
            </div>
          </div>
          <div className="centre-column">
            <ShowBubbles bubbles={this.props.bubbles} bubbleClick={this.props.bubbleClick}  isTiming={this.isTiming} deleteActive={this.props.deleteActive} toggleDelete={this.props.toggleDelete} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)} isActive={this.props.isActive}/>
          </div>
          <div className="right-column">
            <div className="widget clearfix">
              <SidePanel activeBubble={this.props.activeBubble}  editInit={this.props.editInit} editActive={this.props.editActive} editBubble={this.props.editBubble} updateEditBubble={this.props.updateEditBubble} resetEditBubble={this.props.resetEditBubble} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)} isActive={this.props.isActive} toggleTimer={this.toggleTimer} isCurrent={true} isTiming={this.isTiming} getButtonLabel={this.getButtonLabel} resetDetails={this.props.resetDetails}/>
            </div>
          </div>
        </div>
    );
  }

  componentDidMount = () => {
    this.props.onRefresh(this.url);
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

  toggleTimer = (bubble) => {
    if(this.state.isTiming===bubble._id){
      bubble.duration_seconds = Math.round(bubble.duration_seconds + ((Date.now() - bubble.intervalStart) / 1000));
      var then1 = () =>{
        this.props.onRefresh(this.url);
        this.setState({
          isTiming: null
        });
      }
      this.fetchHelper('/api/bubbles' + '/' + bubble._id, 'PUT', {duration_seconds: bubble.duration_seconds}, then1, null)
    }else if (this.state.popActive===false){
      bubble.intervalStart = Date.now();
      var then1 = () =>{
        this.props.onRefresh(this.url);
        this.setState({
          isTiming: bubble._id
        });
      }
      this.fetchHelper('/api/bubbles' + '/' + bubble._id, 'PUT', {intervalStart: bubble.intervalStart}, then1, null)
    }
    if(this.state.popActive===true){

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

  isPopActive = () => {
    return ((this.state.popActive) ?'pincursor':'');
  }

  togglePop = () => {
    this.state.popActive ? this.setState({popActive: false}) : this.setState({popActive: true})
  }

  isTiming = (id) => {
    return (id===this.state.isTiming);
  }

  getButtonLabel = (id) => {
    return this.isTiming(id)?'Stop':'Start';
  }
}

export default CurrentInner;
