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
      isTiming: null,
    };
  };

  url = '/api/bubbles';

  render() {
    return (
        <div className="dim clearfix">
          <div className="link link--topleft">
            <Link to="/Popped"><span className='arrow'>&#9650;</span>popped</Link>
          </div>
          <div className="link link--topright">
            <Link to="/Tutorial">tutorial</Link>
          </div>
          <div className="link link--bottom">
            <Link to="/Backlog"> <span className='arrow'>&#9660;</span>backlog</Link>
          </div>
          <div className={"column column--side column--left" + this.props.columnHideClass("left")}>
            <img src="close.png" alt="click to close blow bubble dialog" className="close clearfix" onClick={() => this.props.toggleColumn("centre")}/>
            <BlowBubble newBubble={this.props.newBubble} updateNewBubble={this.props.updateNewBubble} submitNewBubble={() => this.props.submitNewBubble(this.url)} />
          </div>
          <div className={"column" + this.props.columnHideClass("centre")}>
            <img className="wand" src="wand.png" alt="click to blow bubble" onClick={() => this.props.toggleColumn("left")}/>
            <ShowBubbles bubbles={this.props.bubbles} bubbleClick={this.props.bubbleClick}  isTiming={this.isTiming} deleteActive={this.props.deleteActive} toggleDelete={this.props.toggleDelete} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)} isActive={this.props.isActive} toggleColumn={this.props.toggleColumn}/>
          </div>
          <div className={"column column--side column--right" + this.props.columnHideClass("right")} >
            <img src="close.png" alt="click to close bubble detail dialog" className="close clearfix" onClick={() => this.props.toggleColumn("centre")}/>
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
    // console.log("this.state.isTiming: " + this.state.isTiming + " bubble.duration_seconds: " + bubble.duration_seconds + " bubble.intervalStart: " + bubble.intervalStart + " Date.now(): " + Date.now());
    // console.log("((Date.now() - bubble.intervalStart) / 1000): " + ((Date.now() - bubble.intervalStart) / 1000));
    if(this.state.isTiming===bubble._id){
      bubble.duration_seconds = Math.round(bubble.duration_seconds + ((Date.now() - bubble.intervalStart) / 1000));
      var then1 = () =>{
        this.props.onRefresh(this.url);
        this.setState({
          isTiming: null
        });
        this.props.resetDetails();
      }
      this.fetchHelper('/api/bubbles' + '/' + bubble._id, 'PUT', {duration_seconds: bubble.duration_seconds}, then1, null)
    }else{
      bubble.intervalStart = Date.now();
      var then1 = () =>{
        this.props.onRefresh(this.url);
        this.setState({
          isTiming: bubble._id
        });
        this.props.resetDetails();
      }
      this.fetchHelper('/api/bubbles' + '/' + bubble._id, 'PUT', {intervalStart: bubble.intervalStart}, then1, null)
    }
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
