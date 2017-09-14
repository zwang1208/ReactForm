import React from 'react';
import ReactDOM from 'react-dom';
import Register from './register';
import registerServiceWorker from './registerServiceWorker';
import './index.css';




ReactDOM.render(
    <Register />
    , document.getElementById('root'));
registerServiceWorker();
