import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Avoid minified React error in PlayCanvas
let root = document.getElementById('root');
if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  root.style = 'position: absolute; visibility: hidden;';
  document.body.appendChild(root);
}

ReactDOM.render(<App />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
