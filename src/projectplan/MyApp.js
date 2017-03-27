import React, { Component } from 'react';
import Column from './Column';
import get from '../config/Get.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';
import Put from '../config/Put.js';

class MyApp extends Component{
  constructor(props) {
    super(props);
    this.state = {...props};
    this.onAdding = this.onAdding.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  onAddNew(sid, data){
    var dLength = this.props.casetype.length;
    var that = this;
    var indexCaseType;
    for(var i=0; i<dLength;i++){
        if(sid===this.props.casetype[i].sid){
          var maxSid = 0;
          for(var j=0;j<this.props.casetype[i].case.length;j++){
            if(this.props.casetype[i].case[j].sid>maxSid){
              maxSid = this.props.casetype[i].case[j].sid;
              indexCaseType = i;
            }
          }

          var dataForCreateCase = {
            contract_no:this.props.projectInfo.contract_no,
            project_owner_sid:this.props.projectInfo.project_owner_sid,
            subject:data,
            detail:data,
            case_type:this.props.casetype[i].type,
            enduser_case:this.props.projectInfo.end_user,
            enduser_address:this.props.projectInfo.end_user_address,
            urgency:"Normal",
            requester: {name:"",email:"",mobile:"",phone:"",company:""},
            enduser: {name:"",email:"",mobile:"",phone:"",company:""},
            owner:{thainame:"",email:InfoGen.email,mobile:"",pic:""}
          };
          var formData = new FormData();
          formData.append('token',InfoGen.token);
          formData.append('email',InfoGen.email);
          formData.append('storage',JSON.stringify(dataForCreateCase));
          Put(Url.caseCreate, formData).then(function(res){
            console.log('resCaseCreated', res);
            that.props.casetype[indexCaseType].case.push({sid:res.data_res.ticket_sid,subject:data});
            that.setState({casetype:that.props.casetype});
          });
        }
    }
    // console.log(this.props.casetype);

  }
  onAdding(sid){
    var dLength = this.props.casetype.length;
    for(var i=0;i<dLength;i++){
      if(sid===this.props.casetype[i].sid){
        this.props.casetype[i].status = "Adding";
      }else{
        this.props.casetype[i].status = "Normal";
      }
      for(var j=0;j<this.props.casetype[i].case.length;j++){
          this.props.casetype[i].case[j].status = "Normal";
      }
    }
    this.setState({casetype:this.props.casetype});
  }
  onEdit(fSid, sSid){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
      if(fSid===this.props.casetype[i].sid){
        for(var j=0;j<this.props.casetype[i].case.length;j++){
            if(this.props.casetype[i].case[j].sid===sSid){
               this.props.casetype[i].case[j].status = "Editing";
            }else{
              this.props.casetype[i].case[j].status = "Normal";
            }
        }
      }else{
        for(var j2=0;j2<this.props.casetype[i].case.length;j2++){
          this.props.casetype[i].case[j2].status = "Normal";
        }
      }
      this.props.casetype[i].status = "Normal";
    }
    this.setState({casetype:this.props.casetype});
  }
  onEditChange(fSid, sSid, value){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
        if(fSid===this.props.casetype[i].sid){
            for(var j=0;j<this.props.casetype[i].case.length;j++){
                if(this.props.casetype[i].case[j].sid===sSid){
                    this.props.casetype[i].case[j].subject = value;
                    var formData = new FormData();
                    formData.append('token',InfoGen.token);
                    formData.append('email',InfoGen.email);
                    formData.append('ticket_sid', sSid);
                    formData.append('new_subject', value);
                    get(Url.casemodifySubject,formData).then(function(res){
                      console.log(res);
                    });
                }
            }
        }
    }
    this.setState({casetype:this.props.casetype});
  }
  onDelete(fSid, sSid){
      var dLength = this.props.casetype.length;
      var index = -1;
      for(var i=0; i<dLength;i++){
        if(fSid===this.props.casetype[i].sid){
            for(var j=0;j<this.props.casetype[i].case.length;j++){
                if(this.props.casetype[i].case[j].sid===sSid){
                    index = j;
                    break;
                }
            }
            this.props.casetype[i].case.splice(index, 1);
            this.setState( {casetype: this.props.casetype} );
        }
      }
      var formData = new FormData();
      formData.append('token',InfoGen.token);
      formData.append('email',InfoGen.email);
      formData.append('ticket_sid', sSid);
      Put(Url.caseRemove, formData).then(function(res){
          console.log(res);
          if(res.message){
            alert(res.message);
          }
      });
  }
  handleAddColumn(newColumn){
    this.props.casetype.push({
      sid:(this.props.casetype.length+1),
      type:newColumn,
      status:"Normal",
      case:[]
    });
    this.setState( {casetype: this.props.casetype} );
  }
  handleChangeStaffCase = (ticketSid, emailNewOwner) => {
    this.props.onChangeStaffCase(ticketSid, emailNewOwner);
  }
  render(){
    return(
      <div id="container">
        <Column onChangeStaffCase={this.handleChangeStaffCase} listUserCanAddProject={this.state.listUserCanAddProject} onDelete={this.onDelete} onAdding={this.onAdding} casetype={this.state.casetype} onEdit={this.onEdit} onEditChange={this.onEditChange} onAddNew={this.onAddNew} listType={this.props.listType} projectInfo={this.props.projectInfo} onAddColumn={this.handleAddColumn} />
      </div>
      );
  }
}

export default MyApp;
