import React, { Component } from 'react';
import {Link} from 'react-router';

import BlowBubble from './blow_bubble';
import DeleteBubble from './delete_bubble';
import ShowBubbles from './show_bubbles.js';
import LogOut from './log_out.js'
import SidePanel from './side_panel.js';
import MakeCurrent from './make_current.js';

class BackLogInner extends Component {
  constructor() {
    super();
    this.state = {
      backLog: [],
      makeCurrent: false
    };
  };

  url = '/api/backlog';

  render() {

    return (
      <div>
        <div className="left-column centerChildren">
          <div className="btn link">
            <Link to="/done"><span className='arrow'>&#9650;</span> Current</Link>
          </div>
          <BlowBubble newBubble={this.props.newBubble} updateNewBubble={this.props.updateNewBubble} submitNewBubble={() => this.props.submitNewBubble(this.url)} />
        </div>
        <div className="centre-column">
          <ShowBubbles bubbles={this.props.bubbles} bubbleClick={this.props.bubbleClick} isTiming={() => {return false}} deleteActive={this.props.deleteActive} toggleDelete={this.props.toggleDelete} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)} isActive={this.props.isActive} isBackLog={true}/>
        </div>
        <div className="right-column widget">
          <SidePanel activeBubble={this.props.activeBubble} editInit={this.props.editInit} editActive={this.props.editActive} editBubble={this.props.editBubble} updateEditBubble={this.props.updateEditBubble} resetEditBubble={this.props.resetEditBubble} url={this.url} onError={this.props.onError} onRefresh={() => this.props.onRefresh(this.url)} isCurrent={false} resetDetails={this.props.resetDetails} makeCurrent={this.makeCurrent}/>
        </div>
      </div>
    );
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
      // console.log('then2');
      // console.log(response);
        then2? then2():null;
    })
    .catch((error) => {
      console.log(error);
      this.onError(error);
    });
  }

  componentDidMount = () => {
    this.props.onRefresh(this.url);
  }

  makeCurrent = (bubble) => {
    var then1 = () => {
      fetch(this.url + '/' + bubble._id, {
        method: 'DELETE'
      })
      .then((response)=> {
        this.props.onRefresh(this.url);
      })
    }
    this.fetchHelper('/api/bubbles', 'POST', bubble, then1, null)
  }

  toggleMakeCurrent = () => {
    this.state.makeCurrent ? this.setState({makeCurrent: false}) : this.setState({makeCurrent: true})
  }

  bubbleClick = (bubble) => {
    this.state.makeCurrent ? this.makeCurrent(bubble) : null
  }
}

export default BackLogInner;
