import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ContactUser from './ContactUser';
import ProjectOwner from './ProjectOwner';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Paper from 'material-ui/Paper';
import { Columns, Column } from 're-bulma';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      listUserCanAdd:this.props.listUserCanAdd,
      projectInfo:this.props.projectInfo,
      projectOwner:this.props.projectOwner,
      projectContact:this.props.projectInfo.project_contact,
      updated:false,
      showMore:false,
      openCloseProject:false,
      remarkCloseProject:''
    };
  }
  handleOpenShowMore = () => {
    this.setState({showMore:true});
  }
  handleUpdateData = () => {
    var that = this;
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('project_sid',localStorage.getItem("project_sid"));
    get(Url.projectDetail, formData).then(function(res){

      that.setState({projectInfo:res.project_detail.project_detail});
      that.setState({projectContact:res.project_detail.project_detail.project_contact});
      location.reload();
    });
    if(that.state.updated){
      that.setState({updated:false});
    }else{
      that.setState({updated:true});
    }
  }
  closeProject = () => {
    console.log(this.state.remarkCloseProject);
    console.log(this.state.projectInfo.project_sid);
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("project_sid", this.state.projectInfo.project_sid);
    formData.append("remark_close_project", this.state.remarkCloseProject);
    var that = this;
    var tmp = this.state.projectInfo;
    Put(Url.closeProject,formData).then(function(res){
      if(!res.error){
        tmp.data_status = '400';
        that.setState({openCloseProject:false,remarkCloseProject:'',projectInfo:tmp});
      }
    });
  }
  remarkCloseProject = (e) => {
    this.setState({remarkCloseProject:e.target.value});
  }
  render(){
    var columns;
    var styles;
    var cellHeight;
    var projectHeader;
    var contractUser = <ContactUser onUpdateData={this.handleUpdateData} projectInfo={this.state.projectInfo} projectContact={this.state.projectInfo.project_contact} />;
    var cellHeight;
    if(this.state.showMore){
      cellHeight = "auto";
    }else{
      cellHeight = 80;
    }
    var showMore;
    if(this.state.showMore){
      showMore = <HardwareKeyboardArrowUp />
    }else{
      showMore = <HardwareKeyboardArrowDown />
    }
      columns = 3;
      styles = {
        header: {
          margin:'0px 10px'
        },
        card: {
          // 'padding': '8px',
          'border': '1px solid rgb(217, 217, 217)',
          'background': '#fafbfc',
          'borderRadius': '3px'
        },
        root: {
          //  display: 'flex',
          //  flexWrap: 'wrap',
          //  justifyContent: 'space-around',
         },
         gridList: {
           width: '99%',
          //  marginTop:'-20px',
           zIndex: '10'
          //  height: 'initial',
          // height:' auto',
          //  overflowY: 'auto',
         },
         box: {
           textAlign: 'center'
         }
      }
      var btnCloseProject;
      if(this.state.projectInfo.data_status!=="400" && !this.state.openCloseProject){
        btnCloseProject = <div><RaisedButton style={{margin:4}} onTouchTap={()=>{this.setState({openCloseProject:!this.state.openCloseProject})}} label="Close Project" /></div>;
      }else if(this.state.projectInfo.data_status==="400"){
        btnCloseProject = <div>Closed</div>;
      }
      var formCloseProject;
      if(this.state.openCloseProject){
          formCloseProject =
          <div style={{border:'1px solid #ededed', padding:4}}>
            <div></div>
            <div>
              <div style={{margin:4}}>CLOSE PROJECT หมายถึงการทำงานใน Project นี้สิ้นสุดลงแล้ว, เมื่อคุณ CLOSE PROJECT แล้วจะไม่สามารถทำการสร้าง Task ใน Project ได้อีก</div>
              <div><TextField style={{margin:4}} hintText="Remart" value={this.state.remarkCloseProject} onChange={this.remarkCloseProject} /></div>
              <div>
                <RaisedButton onTouchTap={this.closeProject} primary={true} style={{margin:4}} label="Confirm Close" />
                <RaisedButton style={{margin:4}} onTouchTap={()=>{this.setState({openCloseProject:!this.state.openCloseProject})}} label="Cancel Close" />
              </div>
            </div>
          </div>
      }
    projectHeader =
      <Paper zDepth={2} style={styles.root}>
        <div>
          <div style={{overflow:'hidden', padding:10}}>
            <small>
              <Columns>
                <Column>
                  <div >
                    <div><span >{this.state.projectInfo.name}</span> <small style={{color:lightBlack}} >{this.state.projectInfo.contract_no}</small></div>
                    <div><span >{this.state.projectInfo.end_user}</span></div>
                    <div><small style={{color:lightBlack}} >{this.state.projectInfo.end_user_address}</small></div>
                    <div ><small style={{color:grey400}} >Create {this.state.projectInfo.create_datetime_df}</small></div>
                    {btnCloseProject}
                    {formCloseProject}
                  </div>
                </Column>
                <Column>
                  <div style={styles.box}>
                      <div><ProjectOwner onShowMore={this.handleOpenShowMore} projectInfo={this.state.projectInfo} listUserCanAdd={this.props.listUserCanAdd} projectOwner={this.state.projectOwner} /></div>
                   </div>
                </Column>
                <Column>
                   <div>
                      <div>{contractUser}</div>
                   </div>
                 </Column>
              </Columns>
            </small>
          </div>
        </div>
      </Paper>;


    console.log(this.state.projectInfo);
    return(
      <div className="board-header" style={styles.header}>
        <div style={styles.card}>
          <div>
            {projectHeader}
            <div style={{display:'none'}}>{this.state.updated}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderProject;
