import React, { Component } from 'react';
import {Link} from 'react-router';
import Moment from 'moment';
import Helmet from "react-helmet";


class Popped extends Component {
  constructor() {
    super();
    this.state = {
      allPopped: {}
    };
  };
  render() {
      return (
        <div className="wrapper wrapper--vh">
          <Helmet
            title="Pop Task"
            meta={[
                    {name: "description", content: "minimalist task manager"},
                    {name:"viewport", content:"width=device-width,initial-scale=1"}
                  ]}/>
          <div className="wrapper__content">
            <header>
                <h1>pop task</h1>
            </header>
              <div className="error">{this.state.error}</div>
            <div >
              <div className="link">
                <Link to="/done"><span className='arrow'>&#9660;</span>current</Link>
              </div>
              <div className="popped-wrapper">
                <div className="popped-grid popped-grid--toprow">
                  <span className="pop-col">
                    <strong>name</strong>
                  </span>
                  <span className="pop-col">
                    <strong>duration (minutes)</strong>
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
                </div>
                {Object.keys(this.state.allPopped).map((id, i)=> {
                  var popped = this.state.allPopped[id];
                  var format_startdate = Moment(popped.taskStartDate).format('YY-MM-DD');
                  var format_duedate = Moment(popped.duedate).format('YY-MM-DD');
                  return (
                    <div key={ i } className="popped-grid dim">
                      {popped.i}
                      <span className="pop-col">
                        {popped.name}
                      </span>
                      <span className="pop-col">
                        {Math.round(popped.duration_seconds/60)}
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
