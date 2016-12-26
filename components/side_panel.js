import React, { Component } from 'react';

import SidePanelDetails from './side_panel_details'
import SidePanelEdit from './side_panel_edit'

class SidePanel extends Component {
  render() {
    if(this.props.editActive){
      // console.log('this.props.editBubble in SidePanel');
      // console.log(this.props.editBubble);
      return (
        <SidePanelEdit editBubble={this.props.editBubble} updateEditBubble={this.props.updateEditBubble} resetEditBubble={this.props.resetEditBubble} url={this.props.url} onError={this.props.onError} onRefresh={this.props.onRefresh}/>
      )
    } else if(this.props.activeBubble!=null){
        return (
          <SidePanelDetails activeBubble={this.props.activeBubble} />
        );
        }else{
          return (
            <div className="sidepanel">
              Hover over a bubble to see details.
            </div>
          )
        }
  }
}

export default SidePanel;
