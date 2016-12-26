import React from 'react';
// import FbApp from './firebase_app';
import { browserHistory } from 'react-router';

var Login = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      mode: 'login',
      error: null,
      name: ''
    }
  },

  render: function() {
    return(
    <div className="formBox clearfix">
      { this.state.error ? <div>{ this.state.error }</div> : null }
      <div className="formGroup">
        <label>
          <input type='radio' value='login' checked={ this.state.mode === 'login' } onChange={ this.setMode } />
          Login
        </label>
        <label>
          <input type='radio' value='signup' checked={ this.state.mode === 'signup' } onChange={ this.setMode } />
          Signup
        </label>
      </div>
      <div className="formGroup">
        <div>
          <label htmlFor='email'>Email: </label>
          <input type='text' name='email' value={ this.state.email } onChange={ this.setEmail } />
        </div>
        <div>
          <label htmlFor='email'>Password: </label>
          <input type='password' name='password' value={ this.state.password } onChange={ this.setPassword } />
        </div>
      </div>
      <div className="centerChildren">
        <button onClick={ this.login } className="bubble loginBtn">
          { this.state.mode === 'login' ? "Login" : "Sign Up" }
        </button>
      </div>
    </div>)
  },

  setEmail: function(evt) { this.setState({ email: evt.target.value }); },
  setPassword: function(evt) { this.setState({ password: evt.target.value }); },
  setMode: function(evt) { this.setState({ mode: evt.target.value }); },

  login: function() {
    // var component = this;
    // var result;
    // if (this.state.mode === 'login') {
    //   result = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    // } else {
    //   result = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   // .then((user) => {
    //   //   return user.updateProfile({ displayName: this.state.name })
    //   // });
    // }
    // result.then((data) => {
    //   browserHistory.push('/');
    // })
    // .catch((error) => {
    //   this.setState({error: error.message});
    // })
  }
})

export default Login;
