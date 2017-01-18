import React, { Component } from 'react';
import {Link} from 'react-router';
import Moment from 'moment';
// import LogOut from './log_out'


class Popped extends Component {
  constructor() {
    super();
    this.state = {
      allPopped: {}
    };
  };
  render() {
      return (
        <div id="wrapper">
        <header>
            <h1>pop task</h1>
        </header>
          <div className="error">{this.state.error}</div>
        <div >
          <div className="btn link">
            <Link to="/done"><span className='arrow'>&#9660;</span>Current</Link>
          </div>  
          <div className="popped-wrapper clearfix">
            <span className="pop-col">
              <strong>name</strong>
            </span>
            <span className="pop-col">
              <strong>duration</strong>
            </span>
            <span className="pop-col">
              <strong>start date</strong>
            </span>
            <span className="pop-col">
              <strong>due date</strong>
            </span>
            <span className="pop-col">
              <strong>priority</strong>
            </span>
            {Object.keys(this.state.allPopped).map((id, i)=> {
              var popped = this.state.allPopped[id];
              var format_startdate = Moment(popped.taskStartDate).format('YYYY-MM-DD');
              var format_duedate = Moment(popped.duedate).format('YYYY-MM-DD');
              return (
                <div key={ i } className="popped-grid">
                  {popped.i}
                  <span className="pop-col">
                    {popped.name}
                  </span>
                  <span className="pop-col">
                    {Math.round(popped.duration_seconds/60)}  minutes
                  </span>
                  <span className="pop-col">
                    {format_startdate}
                  </span>
                  <span className="pop-col">
                    {format_duedate}
                  </span>
                  <span className="pop-col">
                    {popped.priority}
                  </span>
                </div>)
              }) }

          </div>
        </div>
      </div>
      );
    }

  componentDidMount = () => {

      fetch('/api/popped')
      .then((response)=> {
        return response.json();
    }).then((json)=>{
        this.setState({
         allPopped: json
       });
    })
    .catch((error) => {
          console.error(error);
        });;
  }
}
export default Popped;
