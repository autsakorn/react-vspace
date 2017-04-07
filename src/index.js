import React from 'react';
import ReactDOM from 'react-dom';
import Url from './config/url';
import get from './config/Get';
import InfoGen from './config/InfoGen';
import ProjectPlanApp from './projectplan/App';
import Project from './project/Project';
import Welcome from './login/Welcome';
import ProjectCreate from './project/ProjectCreate';
import initReactFastclick from 'react-fastclick';
import App from './App.js';
initReactFastclick();

import './index.css';

if(InfoGen.token){
  ReactDOM.render(
    <App />, document.getElementById('root')
  );
}else{
  ReactDOM.render(
    <Welcome />, document.getElementById('root')
  );
}
