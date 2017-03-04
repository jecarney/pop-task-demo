import React, { Component } from 'react';

class ShowBubbles extends Component {

  render() {
    var bubbles = this.props.bubbles;
    if (bubbles===null){
      return (
        <p>Please add a bubble to begin. </p>
      );
    }else{
      return (
            <ul>{this.props.bubbles.map((bubble)=> {
              var id = bubble._id
              return (
                <div key={ id } >
                  <div className={(this.props.isTiming(id)?'timing':'') + ' ' + (this.props.isActive(id)?'bubble--active':'') + " bubble priority" + bubble.priority} onClick={()=>this.props.bubbleClick(bubble)}>
                    <p>{bubble.name}</p>
                    <div className="btnHolder">
                    </div>
                  </div>
                </div>)
              }) }
            </ul>
      );
    }

  }



}

export default ShowBubbles;
