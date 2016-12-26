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
            <Link className="link up" to="/Popped">Popped</Link>
            <BlowBubble newBubble={this.props.newBubble} updateNewBubble={this.props.updateNewBubble} submitNewBubble={() => this.props.submitNewBubble(this.url)} />
            <PopBubble togglePop={this.togglePop}/>
            <DeleteBubble toggleDelete={this.props.toggleDelete}/>
            <Link className="link down" to="/Backlog">Backlog</Link>
          </div>
          <div className="centre-column">
            <ShowBubbles bubbles={this.props.bubbles} onHover={this.props.onHover} onMouseOut={this.props.onMouseOut} bubbleClick={this.bubbleClick} isTiming={this.isTiming} deleteActive={this.props.deleteActive} toggleDelete={this.props.toggleDelete} editInit={this.props.editInit} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)}/>
          </div>
          <div className="right-column">
            <SidePanel activeBubble={this.props.activeBubble} editActive={this.props.editActive} editBubble={this.props.editBubble} updateEditBubble={this.props.updateEditBubble} resetEditBubble={this.props.resetEditBubble} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)}/>
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

  bubbleClick = (bubble) => {
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
    return 'bubble ' + ((id===this.state.isTiming) ?'timing':'');
  }
}

export default CurrentInner;
