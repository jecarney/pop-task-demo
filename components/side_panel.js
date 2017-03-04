import React, { Component } from 'react';

import SidePanelDetails from './side_panel_details'
import SidePanelEdit from './side_panel_edit'

class SidePanel extends Component {
  render() {
    if(this.props.editActive){
      return (
        <SidePanelEdit editBubble={this.props.editBubble} updateEditBubble={this.props.updateEditBubble} resetEditBubble={this.props.resetEditBubble} url={this.props.url} onError={this.props.onError} onRefresh={this.props.onRefresh}/>
      )
    } else if(this.props.activeBubble!=null){
        return (
          <SidePanelDetails activeBubble={this.props.activeBubble} editInit={this.props.editInit} url={this.props.url} onRefresh={this.props.onRefresh} isTiming={this.props.isTiming} toggleTimer={this.props.toggleTimer} getButtonLabel={this.props.getButtonLabel} isCurrent={this.props.isCurrent} resetDetails={this.props.resetDetails} makeCurrent={this.props.makeCurrent}/>
        );
        }else{
          return (
            <div className="sidepanel">
              <h3>click to select bubble</h3>
            </div>
          )
        }
  }
}

export default SidePanel;
