import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Put from '../config/Put.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
class ServiceReportContactUser extends Component {
    constructor(props){
        super(props);
        this.state = {
          projectContact:this.props.projectContact,open: false, addingContact:false,stepIndex: 0,finished: false,
          name:"",email:"",phone:"",mobile:"",company:"", selectedContactUser:false
        };
    }
    handleAddContact = () => {
      if(this.state.addingContact){
        this.setState({addingContact:false});
      }else{
        this.setState({addingContact:true});
        this.setState({name:""});
        this.setState({email:""});
        this.setState({mobile:""});
        this.setState({phone:""});
        this.setState({company:""});
      }
    }

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

    handleName = (e) => {
      this.setState({name:e.target.value});
      this.props.onContactUser(e.target.value, this.state.email, this.state.mobile, this.state.phone, this.state.company);
    }
    handleEmail = (e) => {
      this.setState({email:e.target.value});
      this.props.onContactUser(this.state.name, e.target.value, this.state.mobile, this.state.phone, this.state.company);
    }
    handleMobile = (e) => {
      this.setState({mobile:e.target.value});
      this.props.onContactUser(this.state.name, this.state.email, e.target.value, this.state.phone, this.state.company);
    }
    handlePhone = (e) => {
      this.setState({phone:e.target.value});
      this.props.onContactUser(this.state.name, this.state.email, this.state.mobile, e.target.value, this.state.company);
    }
    handleCompany = (e) => {
      this.setState({company:e.target.value});
      this.props.onContactUser(this.state.name, this.state.email, this.state.mobile, this.state.phone, e.target.value);
    }
    selectedContactUser = (name, email, mobile, phone, company) => {
      this.setState({name:name});
      this.setState({email:email});
      this.setState({mobile:mobile});
      this.setState({phone:phone});
      this.setState({company:company});
      this.setState({selectedContactUser:true});
      this.props.onContactUser(name, email, mobile, phone, company);
    }
    updateDataToCompany = () => {
      this.props.onContactUser(this.state.name, this.state.email, this.state.mobile, this.state.phone, this.state.company);
    }
    addContactUser = () => {
      var formData = new FormData();
      formData.append("email",InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("project_sid",this.props.projectInfo.project_sid);
      formData.append("end_user_name",this.state.name);
      formData.append("end_user_email",this.state.email);
      formData.append("end_user_mobile",this.state.mobile);
      formData.append("end_user_phone",this.state.phone);
      formData.append("end_user_company",this.state.company);
      // console.log(this.props.projectInfo);
      // console.log(formData);
      // formData.append("")
      var that = this;
      Put(Url.addProjectContact, formData).then(function(res){
        console.log(res);
        if(!res.error){
          that.setState({addingContact:false});
          that.setState({stepIndex:0});
          that.setState({finished:false});
          that.setState({name:''});
          that.setState({mobile:''});
          that.setState({phone:''});
          that.setState({email:''});
          that.setState({company:''});
        }
      });
    }

    render(){

        var styles = {
          style: {
            textTransform:'inherit'
          },
          box: {
            margin:'2%'
          }
        }
        var contact_user_list = <RaisedButton onClick={this.handleAddContact} style={styles.style} label="List Contact" />;
        var listContact = [];
        if(this.state.projectContact.length>0){
          this.state.projectContact.forEach((item,k) => {
            var tmp =
                  <ListItem key={k} style={{padding:0}} onClick={()=>this.selectedContactUser(item.name,item.email,item.mobile,item.phone,item.company)}
                    primaryText={item.name}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}></span>
                        {item.email}, {item.mobile}, {item.phone} {item.company}
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                ;

            listContact.push(tmp);
          });
        }

        var showCheckBox = false;
        var table = <List style={{margin:'0px -16px'}}>{listContact}</List>;

        var btnAddContact;
        var stepAdd;
        if(this.state.selectedContactUser){
          btnAddContact =
          <div>
            <div><span style={{color:darkBlack}}>Name: </span> {this.state.name}</div>
            <div><span style={{color:darkBlack}}>Email: </span> {this.state.email}</div>
            <div><span style={{color:darkBlack}}>Mobile: </span> {this.state.mobile}</div>
            <div><span style={{color:darkBlack}}>Phone: </span> {this.state.phone}</div>
            <div><span style={{color:darkBlack}}>Company: </span> {this.state.company}</div>
          </div>;
        } else if(this.state.addingContact){
            const {finished, stepIndex} = this.state;
            stepAdd = <div>
                        <div>{contact_user_list}</div>
                        <div>
                          <TextField hintText="Full Name" style={{marginRight:'10px'}} value={this.state.name} onChange={this.handleName} floatingLabelText="Full Name" />
                          <TextField hintText="Email" value={this.state.email} onChange={this.handleEmail} floatingLabelText="Email" />
                        </div>
                        <div>
                          <TextField hintText="Mobile" style={{marginRight:'10px'}} value={this.state.mobile} onChange={this.handleMobile} floatingLabelText="Mobile" />
                          <TextField hintText="Phone" value={this.state.phone} onChange={this.handlePhone} floatingLabelText="Phone" />
                        </div>
                        <div>
                          <TextField hintText="Company" value={this.state.company} onChange={this.handleCompany} floatingLabelText="Company" />
                        </div>
                      </div>
        }else{
            btnAddContact =
            <div>
              <div>
                  {table}
                  <RaisedButton onClick={this.handleAddContact} style={styles.style} label="Add New" />
              </div>
            </div>
        }
        var formAddContact = <div>{btnAddContact} {stepAdd}</div>
        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];
        var dialog =
          <div>
              <div style={styles.box}>{formAddContact}</div>
          </div>;
        return(
          <div>
            <div>{dialog}</div>
          </div>
        )
    }
}

export default ServiceReportContactUser;
