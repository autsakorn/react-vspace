import React from 'react';
import ReactDOM from 'react-dom';
import Url from './config/url';
import get from './config/Get';
import InfoGen from './config/InfoGen';
import ProjectPlanApp from './projectplan/App';
import Project from './project/Project';
import Profile from './container/Profile';
import Welcome from './login/Welcome';
import ProjectCreate from './project/ProjectCreate';
import initReactFastclick from 'react-fastclick';
import Ticket from './ticket/Ticket';
import Appointment from './appointment/Appointment';

initReactFastclick();

import './index.css';
var formData = new FormData();

if(InfoGen.token){
  formData.append('token',InfoGen.token);
  formData.append('email',InfoGen.email);
  get(Url.info, formData).then(function(resInfo){
    if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="ProjectCreate"){
        ReactDOM.render(<ProjectCreate info={resInfo.data} />, document.getElementById('root'));
    }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Profile"){
        ReactDOM.render(<Profile info={resInfo.data} />, document.getElementById('root'));
    }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Ticket"){
        ReactDOM.render(<Ticket info={resInfo.data} />, document.getElementById('root'));
    }else if(localStorage.getItem("project_sid")){
        formData.append('project_sid',localStorage.getItem("project_sid"));
        get(Url.projectDetail, formData).then(function(resPd){
          get(Url.listCaseAll, formData).then(function(resLCA){
            ReactDOM.render(
              <ProjectPlanApp projectOwner={resPd.project_detail.owner} info={resInfo.data} projectInfo={resPd.project_detail.project_detail} casetype={resPd.data} listType={resLCA.data} listUserCanAddProject={resPd.listUserCanAddProject}/>, document.getElementById('root')
            );
          });
        });
    }else if(localStorage.getItem("tasks_sid")){
        ReactDOM.render(<Appointment tasks_sid={localStorage.getItem("tasks_sid")} info={resInfo.data} />, document.getElementById('root'));
    }else{
        ReactDOM.render(<Project urlProject={Url.project} formData={formData} info={resInfo.data} projectList={[]} />, document.getElementById('root'));
    }
  },function(error){
    console.log(error);
  });
}else{
  ReactDOM.render(
    <Welcome />, document.getElementById('root')
  );
}
