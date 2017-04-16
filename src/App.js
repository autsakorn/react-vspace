import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from './config/url';
import get from './config/Get';
import InfoGen from './config/InfoGen';
import ProjectPlanApp from './projectplan/App';
import Project from './project/Project';
import Welcome from './login/Welcome';
import ProjectCreate from './project/ProjectCreate';
import initReactFastclick from 'react-fastclick';
import Profle from './container/Profile';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {home:"Loading...",projectCreate:"Loading...",project:"Loading...",profile:"loading..."}
    // var formData = new FormData();
    // formData.append('token',InfoGen.token);
    // formData.append('email',InfoGen.email);

  }
  Home = () => (
    <div>{this.state.home}</div>
  )
  ProjectPlan = () => (
    <div>{this.state.project}</div>
  )
  ProjectCreate = () => (
    <div>{this.state.projectCreate}</div>
  )
  Profile = () => (
    <div>
      {this.state.profile}
    </div>
  )

  componentDidMount() {
    var that = this;
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    get(Url.info, formData).then(function(resInfo){
      that.setState({projectCreate:<ProjectCreate info={resInfo.data} />});
      that.setState({profile:<Profle info={resInfo.data} />});
      if(localStorage.getItem("project_sid")){
        formData.append('project_sid',localStorage.getItem("project_sid"));
        get(Url.projectDetail, formData).then(function(resPd){
          get(Url.listCaseAll, formData).then(function(resLCA){
            that.setState({
              project: <ProjectPlanApp projectOwner={resPd.project_detail.owner} info={resInfo.data} projectInfo={resPd.project_detail.project_detail} casetype={resPd.data} listType={resLCA.data} listUserCanAddProject={resPd.listUserCanAddProject}/>
            });
          });
        });
      }else{
        that.setState({
          home: <div><Project urlProject={Url.project} formData={formData} info={resInfo.data} projectList={[]} /></div>
        });
      }
    },function(error){
      console.log(error);
    });
  }

  componentWillUnmount() {

  }

  render() {
    // var container;
    //

          // <Router>
          //       </Router>
          //       <Route exact path="/" component={this.Home}/>
          //       <Route exact path="/project" component={this.ProjectPlan}/>
          //       <Route exact path="/pages/projectmanagementv1" component={this.Home}/>
          //       <Route exact path="/projectcreate" component={this.ProjectCreate}/>
          //       <Route exact path="/profile" component={this.Profile}/>

    var myApp;
    if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="ProjectCreate"){
      myApp = this.ProjectCreate;
    }else if(localStorage.getItem("project_sid")){
      myApp = this.ProjectPlan;
    }else{
      myApp = this.Home;
    }
    console.log(this.state);
    return (
        <div>
          {myApp}
        </div>

    );
  }
}

export default App;
