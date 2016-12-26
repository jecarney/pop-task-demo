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
                  <div className={this.props.isTiming(id) + " priority" + bubble.priority} onMouseOver={()=>this.props.onHover(bubble)} onMouseOut={()=>this.props.onMouseOut()} onClick={()=>this.props.bubbleClick(bubble)}>
                    <p>{bubble.name}</p>
                    <div className="btnHolder">
                      <button className={(this.props.deleteActive?"visible ":"invisible") + " deleteBtn"} onClick={(evt)=>this.onDelete(id, evt)} >Delete</button>
                      <button className="editBtn" onClick={(evt)=>this.props.editInit(evt, bubble)} >Edit</button>
                    </div>
                  </div>
                </div>)
              }) }
            </ul>
      );
    }

  }

  onDelete = (id, evt) => {
    evt.stopPropagation();
    fetch(this.props.url + '/' + id, {
      method: 'DELETE'
    })
    .then((response)=> {
      this.props.onRefresh();
      this.props.toggleDelete(false);
    })
    .catch((error) => {
      console.log(error);
      this.props.onError(error);
    });
  }
}

export default ShowBubbles;
