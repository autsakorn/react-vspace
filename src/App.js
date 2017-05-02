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
import Profile from './container/Profile';
import Appointment from './appointment/Appointment';
import ApproveService from './approval/ApproveService';
import Standby7x24 from './standby/Standby7x24';
import HistoryAppointment from './container/HistoryAppointment';
import NavCompoment from './nav/NavCompoment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Asset from './asset/Asset.js';
import Snackbar from 'material-ui/Snackbar';
import Manage7x24 from './standby/Manage7x24';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {home:"Loading...",projectCreate:"Loading...",project:"Loading...",profile:"loading...",page:<div />,toggle:false,openSnackbar:false}
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
    this.genPage();
  }

  handleChangePage = (page) => {
    this.setState({openSnackbar:true});
    console.log(page);
    if(page){
      localStorage.removeItem("project_sid");
      localStorage.removeItem("tasks_sid");
      localStorage.setItem("currectPage",page);
    }else{
      localStorage.removeItem("currectPage");
    }
    this.genPage();
  }
  genPage = () => {

    var that = this;
    if(InfoGen.token){
      var formData = new FormData();
      formData.append('token',InfoGen.token);
      formData.append('email',InfoGen.email);
      get(Url.info, formData).then(function(resInfo){
        if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Boards"){
          that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} /><Project onChangePage={that.handleChangePage} urlProject={Url.project} formData={formData} info={resInfo.data} projectList={[]} /></div>});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Manage7x24"){
            that.setState({openSnackbar:false,page:
              <div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
                <Manage7x24 />
              </div>
            });
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="ProjectCreate"){
            that.setState({openSnackbar:false,page:
              <div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <ProjectCreate onChangePage={that.handleChangePage} info={resInfo.data} /></div>});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Profile"){
            that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <Profile onChangePage={that.handleChangePage} info={resInfo.data} /></div>,toggle:!that.state.toggle});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Standby7x24"){
            that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <Standby7x24 onChangePage={that.handleChangePage} info={resInfo.data} /></div>});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="ApproveService"){
            that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <ApproveService onChangePage={that.handleChangePage} info={resInfo.data} /></div>});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="HistoryAppointment"){
          that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
            <HistoryAppointment onChangePage={that.handleChangePage} my_staff={resInfo.my_staff} info={resInfo.data} /></div>});
        }else if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="Asset"){
          that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
            <Asset onChangePage={that.handleChangePage} my_staff={resInfo.my_staff} info={resInfo.data} /></div>});
        } else if(localStorage.getItem("project_sid")){
            formData.append('project_sid',localStorage.getItem("project_sid"));
            get(Url.projectDetail, formData).then(function(resPd){
              get(Url.listCaseAll, formData).then(function(resLCA){
                that.setState({openSnackbar:false,page:
                  <div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
                  <ProjectPlanApp listUserCanAddTask={resInfo.listUserCanAddTask} onChangePage={that.handleChangePage} projectOwner={resPd.project_detail.owner} info={resInfo.data} projectInfo={resPd.project_detail.project_detail} casetype={resPd.data} listType={resLCA.data} listUserCanAddProject={resPd.listUserCanAddProject}/>
                  </div>}
                );
              });
            });
        }else if(localStorage.getItem("tasks_sid")){
            that.setState({openSnackbar:false,page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <Appointment onChangePage={that.handleChangePage} tasks_sid={localStorage.getItem("tasks_sid")} info={resInfo.data} /></div>});
        }else{
            that.setState({
              openSnackbar:false,
              page:<div><NavCompoment onChangePage={that.handleChangePage} info={resInfo.data} />
              <Project listUserCanAddTask={resInfo.listUserCanAddTask} onChangePage={that.handleChangePage} urlProject={Url.project} formData={formData} info={resInfo.data} projectList={[]} /></div>
            });
        }
      },function(error){
        console.log(error);
      });
    }else{
      that.setState({page:<Welcome />});
    }
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
    // if(localStorage.getItem("currectPage") && localStorage.getItem("currectPage")==="ProjectCreate"){
    //   myApp = this.ProjectCreate;
    // }else if(localStorage.getItem("project_sid")){
    //   myApp = this.ProjectPlan;
    // }else{
    //   myApp = this.Home;
    // }
    // console.log(this.state);
    return (
      <MuiThemeProvider>
        <div>
          {this.state.page}
          <Snackbar
            open={this.state.openSnackbar}
            message="Loading..."
            onRequestClose={()=>{this.setState({openSnackbar:false})}}
          />
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
