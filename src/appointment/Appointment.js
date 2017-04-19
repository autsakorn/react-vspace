import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import ContentCreate from 'material-ui/svg-icons/content/create';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
// import Moment from 'react-moment';
import moment from 'moment';
export default class Appointment extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks_sid:this.props.tasks_sid, data:{},
      finished: false,
      stepIndex: 0,
      indexFinished:2,
      contact_user_editing:false,
      appointment_editing:false
    }
    this.styles = {
      row: {padding:10}
    }
  }
  componentDidMount(){
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("tasks_sid", this.props.tasks_sid);
    var that = this;
    get(Url.appointment, formData).then(function(res){
      console.log(res);
      // that.setState({data:res.data});
      if(res.data.request_taxi==="0"){
        if(res.data.status_from_log==="0"){
          that.setState({data:res.data,stepIndex:0, indexFinished:2});
        }else if(res.data.status_from_log==="100"){
          that.setState({data:res.data,stepIndex:0, indexFinished:2});
        }else if(res.data.status_from_log==="200"){
          that.setState({data:res.data,stepIndex:0, indexFinished:2});
        }else if(res.data.status_from_log==="300"){
          that.setState({data:res.data,stepIndex:1, indexFinished:2});
        }else if(res.data.status_from_log==="400"){
          that.setState({data:res.data,stepIndex:2, indexFinished:2});
        }else if(res.data.status_from_log==="500"){
          that.setState({data:res.data,stepIndex:3, indexFinished:2});
        }else{
          that.setState({data:res.data, stepIndex:3,indexFinished:2});
        }
      }else{
        if(res.data.status_from_log==="0"){
          that.setState({data:res.data,stepIndex:0, indexFinished:4});
        }else if(res.data.status_from_log==="100"){
          that.setState({data:res.data,stepIndex:0, indexFinished:4});
        }else if(res.data.status_from_log==="200"){
          that.setState({data:res.data,stepIndex:1, indexFinished:4});
        }else if(res.data.status_from_log==="300"){
          that.setState({data:res.data,stepIndex:2, indexFinished:4});
        }else if(res.data.status_from_log==="400"){
          that.setState({data:res.data,stepIndex:3, indexFinished:4});
        }else if(res.data.status_from_log==="500"){
          that.setState({data:res.data,stepIndex:4, indexFinished:4});
        }else {
          that.setState({data:res.data, stepIndex:5,indexFinished:4});
        }
      }
    });
  }
  componentWillUnmount(){

  }
  handleNext = () => {
    // alert(nextStatus);
    const {stepIndex} = this.state;

    var that = this;
    var formData = new FormData();
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("task_status", this.state.data.status_from_log);
    formData.append("taxi_fare",'0');
    formData.append("taxi_fare_stang",'0');
    formData.append("lat",0);
    formData.append("lng",0);
    Put(Url.checkpoint, formData).then(function(res){
      console.log(res);
      that.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= that.state.indexFinished,
      });
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  renderStepActions(step) {
    const {stepIndex} = this.state;

    // <RaisedButton
    //   label={stepIndex === this.state.indexFinished ? 'Finish' : 'Next'}
    //   disableTouchRipple={true}
    //   disableFocusRipple={true}
    //   primary={true}
    //   onTouchTap={this.handleNext}
    //   style={{marginRight: 12}}
    // />
    var btnNext;
    if(this.state.data.status_from_log==='500'){
      btnNext =
      <RaisedButton
        label={stepIndex === this.state.indexFinished ? 'Finish' : 'Next'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleNext}
        style={{marginRight: 12}}
      />
    }
    return (
      <div style={{margin: '12px 0'}}>

        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        {btnNext}
      </div>
    );
  }
  handleEditingContactUser = () => {
    this.setState({
      contact_user_editing:!this.state.contact_user_editing,
      appointment_editing:false
    });
  }
  handleEditingAppointment = () => {
    this.setState({
      contact_user_editing:false,
      appointment_editing:!this.state.appointment_editing
    });
  }
  handleChangeEndUserName = (e) => {
    var tmp = this.state.data;
    tmp.end_user_contact_name_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserEmail = (e) => {
    var tmp = this.state.data;
    tmp.end_user_email_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserMobile = (e) => {
    var tmp = this.state.data;
    tmp.end_user_mobile_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserPhone = (e) => {
    var tmp = this.state.data;
    tmp.end_user_phone_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserCompany = (e) => {
    var tmp = this.state.data;
    tmp.end_user_company_name_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  render(){
    const styles = {
      button: {margin: 12}
    };
    const {finished, stepIndex} = this.state;

    var contact_user_element;
    if(this.state.contact_user_editing){
      contact_user_element =
      <div>
        <TextField onChange={this.handleChangeEndUserName} value={this.state.data.end_user_contact_name_service_report} hintText="Name" floatingLabelText="Name" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserEmail} value={this.state.data.end_user_email_service_report} hintText="Email" floatingLabelText="Mail" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserMobile} value={this.state.data.end_user_mobile_service_report} hintText="Mobile" floatingLabelText="Mobile" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserPhone} value={this.state.data.end_user_phone_service_report} hintText="Phone" floatingLabelText="Phone" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserCompany} value={this.state.data.end_user_company_name_service_report} hintText="Company" floatingLabelText="Company" fullWidth={true} floatingLabelFixed={true} />
      </div>
    }else{
      contact_user_element =
      <div>
        {this.state.data.end_user_contact_name_service_report}<br/>
        {this.state.data.end_user_email_service_report}<br/>
        {this.state.data.end_user_mobile_service_report+ " / "+ this.state.data.end_user_phone_service_report}<br/>
        {this.state.data.end_user_company_name_service_report}
      </div>
    }

    var appointment_element;
    if(this.state.appointment_editing){
      appointment_element = <div>
          <div style={{padding:10}}>
            <div><span>Appointment: <ContentCreate onTouchTap={this.handleEditingAppointment} style={{color:lightBlack}} /></span></div>
            <div>
              <DatePicker
                onChange={this.handleChangeMinDate}
                autoOk={this.state.autoOk}
                floatingLabelText="Appointment Date"
                defaultDate={moment(this.state.data.appointment_YmdHi)}
                disableYearSelection={this.state.disableYearSelection}
              />
            </div>
          </div>
          <Divider />
        </div>
    }else{
      appointment_element = <div>
        <div style={{padding:10}}><span>Appointment: </span>
        <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.appointment +" ("+this.state.data.expect_duration+")"}</span> <ContentCreate onTouchTap={this.handleEditingAppointment} style={{color:lightBlack}} /></div>
        <Divider />
        <div style={{padding:10}}><span>Expect Finish: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.expect_finish}</span></div>
        <Divider />
      </div>
    }
    var content;
    if(this.state.data.tasks_sid){
      var stepper;
      if(this.state.data.request_taxi==="0"){
        stepper =
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
              <StepLabel>START THE TASK</StepLabel>
              <StepContent>
                <p>
                  Start the task
                </p>
                {this.renderStepActions(0)}
              </StepContent>
          </Step>
          <Step>
            <StepLabel>ACTION</StepLabel>
            <StepContent>
              <p>Input Action</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>END USER SIGNATURE</StepLabel>
            <StepContent>
              <div>
                <RaisedButton label="VIA EMAIL" onTouchTap={this.handleNext} secondary={true} style={styles.button} />
              </div>
              {
                //this.renderStepActions(2)
              }
            </StepContent>
          </Step>
        </Stepper>
      }else{
        stepper =
        <Stepper activeStep={stepIndex} orientation="vertical">

          <Step>
              <StepLabel>START THE JOURNEY</StepLabel>
              <StepContent>
                <p>
                </p>
                {this.renderStepActions(0)}
              </StepContent>
          </Step>
          <Step>
            <StepLabel>START THE TASK</StepLabel>
            <StepContent>
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>ACTION</StepLabel>
            <StepContent>
              <p>
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>END USER SIGNATURE</StepLabel>
            <StepContent>
              <p>
              </p>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>ARRIVED WHEN REACHING DESTINATION</StepLabel>
            <StepContent>
              <p>
              </p>
              {this.renderStepActions(4)}
            </StepContent>
          </Step>
        </Stepper>
      }

      content =
      <Paper zDepth={2} >

        <div >
          <div style={{padding:10}}><span >Subject: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.no_task+" "+this.state.data.subject}</span></div>
          <Divider />
          <div style={{padding:10}}><span >Subject: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.service_type_name}</span></div>
          <Divider />
          <div style={{padding:10}}><span>End User: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.end_user}</span></div>
          <Divider />
          <div style={{padding:10}}><span>Site: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.ticket_end_user_site}</span></div>
          <Divider />
          {appointment_element}
          <div style={{padding:10}}>
            <div><span>Contact User: </span><ContentCreate onTouchTap={this.handleEditingContactUser} style={{color:lightBlack}} /></div>
            <div>
              <span style={{color:lightBlack,marginLeft:10}}>
              <div>{contact_user_element}</div>
              </span>
            </div>
          </div>
          <Divider />

          <br />
          <div style={{padding:10}}>
            <div>CHECK POINT</div>
            <div></div>
          </div>
          {stepper}
        </div>
      </Paper>
    }else{
      content =
      <div style={{textAlign:'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>
    }
    return(
      <MuiThemeProvider style={{backgroundColor:'#eaeaea'}}>
        <div>
          <NavCompoment info={this.props.info} />
          <div style={{margin:10}}>
              {content}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
