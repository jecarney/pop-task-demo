
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppLayout from './AppLayout';
import Backlog from './Backlog'
import Popped from './Popped'
import './index.css';
import Login from './login0';

ReactDOM.render(
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={AppLayout}>
        <Route path='/login' component={ Login } />
        <IndexRoute component={App}/>
        <Route path="Backlog" component={Backlog} />
        <Route path="Popped" component={Popped} />
      </Route>
    </Router>
  </div>, document.getElementById("root"));
