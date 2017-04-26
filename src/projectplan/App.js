import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {GridList, GridTile} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import MyApp from './MyApp';
import get from '../config/Get.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';
import MainApp from './App';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    // console.log(this.state);
  }
  handleChangeStaffCase = (ticketSid, emailNewOwner) => {
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('ticket_sid', ticketSid);
    formData.append('new_owner', emailNewOwner);
    var that = this;
    get(Url.editOwnerCase,formData).then(function(res){
      console.log(res);
    });
    for (var i = 0; i < this.state.casetype.length; i++) {
      for (var j = 0; j < that.state.casetype[i].case.length; j++) {
        console.log(that.state.casetype[i].case[j]);
        if(that.state.casetype[i].case[j].sid===ticketSid){
          for(var k=0;k<that.state.listUserCanAddProject.length;k++){
            console.log(that.state.listUserCanAddProject[k]);
            if(that.state.listUserCanAddProject[k].emailaddr===emailNewOwner){
                that.state.casetype[i].case[j].owner_thainame = that.state.listUserCanAddProject[k].thainame;
                that.state.casetype[i].case[j].emailaddr = emailNewOwner;
                that.state.casetype[i].case[j].pic_full = this.state.listUserCanAddProject[k].pic_employee;
            }
          }
        }
      }
    }
  }
  render(){
    var style = {
        container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '70px',
        bottom: 0
      },
      wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width:'100%',
        // overflow:'auto'
      }
    }
    return(
      <MuiThemeProvider>
        <div className="color-5-0">
          <NavCompoment onChangePage={()=>{this.props.onChangePage()}} info={this.props.info} />
          <div id="vspace-container" style={style.container}>
            <div className="vspace-wrapper" style={style.wrapper}>
              <MyApp info={this.props.info} projectOwner={this.props.projectOwner} toggleUpdate={"true"} onChangeStaffCase={this.handleChangeStaffCase} casetype={this.state.casetype} projectInfo={this.state.projectInfo} listType={this.state.listType} listUserCanAddProject={this.state.listUserCanAddProject} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
