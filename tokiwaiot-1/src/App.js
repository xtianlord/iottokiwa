/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
// App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Google</h1>
        <a href="http://ec2-57-181-20-73.ap-northeast-1.compute.amazonaws.com:5000/auth/google/callback">Login</a>
      </header>
    </div>
  );
}

export default App;
