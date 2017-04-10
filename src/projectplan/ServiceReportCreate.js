import React, { Component } from 'react';
import ServiceReportContactUser from './ServiceReportContactUser';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import {GridList, GridTile} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Moment from 'react-moment';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from 'moment';
import ContentAdd from 'material-ui/svg-icons/content/add';
class ServiceReportCreate extends Component {
  constructor(props){
    super(props);

    const appointment_date = new Date();
    appointment_date.setFullYear(appointment_date.getFullYear());
    appointment_date.setHours(0, 0, 0, 0);

    const appointment_time = new Date();
    appointment_time.setFullYear(appointment_time.getFullYear());

    this.state = {
      serviceReport:this.props.serviceReport,
      createService:this.props.createService,
      stepIndex: 0,finished: false,caseSid:this.props.caseSid,
      value24: appointment_time, value12: null, openSelectStaff:false,staff:[],
      subject:"",detail:"",service_type:"1",service_type_lable:"Onsite",appointment_date:appointment_date,expect_duration:"8",
      end_user_name:"",end_user_email:"",end_user_mobile:"",end_user_phone:"",end_user_company:"",openServiceType:false,
    };
  }
  handleContactUser = (name, email, mobile, phone, company) => {
    this.setState({end_user_name:name});
    this.setState({end_user_email:email});
    this.setState({end_user_mobile:mobile});
    this.setState({end_user_phone:phone});
    this.setState({end_user_company:company});
  }
  handleSubject = (e) => {
    this.setState({subject:e.currentTarget.value});
  }
  handleDetail = (e) => {
    this.setState({detail:e.currentTarget.value});
  }
  handleAppointment = (event, date) => {
    this.setState({
      appointment_date:date
    });
  }
  handleExpectDuration = (e) => {
    this.setState({expect_duration:e.currentTarget.value});
  }
  handleCreateService = () => {
    if(this.state.createService){
      this.setState({createService:false});
    }else{
      this.setState({createService:true});
    }
    this.props.onStatusCreating(this.state.createService);
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleServiceReportCreate = () => {
    console.log(this.state);
    this.props.onCloseDialog();
    var that = this;
    var engineer = [];
    this.state.staff.forEach((item) => {
        engineer.push(item.email);
    });
    var duration_in_milliseconds = this.state.value24;
    // 60000
    var expect_duration = moment(duration_in_milliseconds).format('HH:mm'); // April 3rd 2017, 2:41:59 pm
    var appointment_date = moment(this.state.appointment_date).format('YYYY-MM-DD');
    var dataCreateService = {
      end_user:{
        name:this.state.end_user_name,
        email:this.state.end_user_email,
        mobile:this.state.end_user_mobile,
        phone:this.state.end_user_phone,
        company:this.state.end_user_company
      },
      type_sid:this.state.service_type,
      subject:this.state.subject,
      appointment_datetime: appointment_date+' '+expect_duration,
      expect_duration: {
        hours: this.state.expect_duration,
        minutes: "0"
      },
      engineer: engineer
    }
    console.log(dataCreateService);
    var formData = new FormData();
    formData.append('ticket_sid', this.state.caseSid);
    formData.append('email',InfoGen.email);
    formData.append('token',InfoGen.token);
    formData.append('data', JSON.stringify(dataCreateService));
    Put(Url.serviceReportCreate, formData).then(function(res){
        console.log(res);
        that.props.onCreatedService();
    });
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;
    var btnNextFinish;
    if(stepIndex===4){
      btnNextFinish = <RaisedButton
        label={'Finish'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleServiceReportCreate}
        style={{marginRight: 12}}
      />
    }else{
      btnNextFinish = <RaisedButton
        label={'Next'}
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
        {btnNextFinish}
      </div>
    );
  }
  handleChangeTimePicker24 = (event, date) => {

    this.setState({value24: date});
  };

  handleChangeTimePicker12 = (event, date) => {
    this.setState({value12: date});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openSelectStaff: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openSelectStaff: false,
    });
  };
  handleSelectStaff = (e) => {
    var tmpDet = {email:e.currentTarget.dataset.id, name:e.currentTarget.dataset.name, pic_employee:e.currentTarget.dataset.pic_employee};
    this.addStaff(tmpDet);
    this.setState({
      openSelectStaff: false,
    });
  }
  addStaff = (tmpDet) => {
    var tmp = this.state.staff;
    var newTmp = [];
    tmp.push(tmpDet);

    tmp.forEach((item) => {
      if(item.email!==tmpDet.email){
        newTmp.push(item);
      }
    });
    newTmp.push(tmpDet);
    this.setState({staff:newTmp});
  }
  handleRequestDelete = (email) => {
    var tmp = this.state.staff;
    var newTmp = [];
    tmp.forEach((item) => {
      if(item.email!==email){
          newTmp.push(item);
      }
    });
    this.setState({staff:newTmp});
  };
  handleChangeServiceType = (event, index, value) => {
    // console.log(event.target.innerText);
    this.setState({service_type:value});
    this.setState({service_type_lable:event.target.innerText});
  }

  render(){
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    const {finished, stepIndex} = this.state;

    var staffList = this.props.listUserCanAddProject.map((item,k) => {
        return <ListItem key={k}
          leftAvatar={<Avatar src={item.pic_employee} />}
          primaryText={item.thainame}
          onClick={this.handleSelectStaff} data-id={item.emailaddr} data-name={item.engname} data-pic_employee={item.pic_employee}
          secondaryText={
            <p>
              {item.engname} <br/>
              {item.emailaddr}
            </p>
          }
          secondaryTextLines={2}
        />
    });
    var staffSelected = [];
    var confirmStaff = [];
    this.state.staff.forEach((item,i) => {
        staffSelected.push(<Chip data-id={item.email} style={styles.chip} key={item.email} onRequestDelete={() => this.handleRequestDelete(item.email)} ><Avatar src={item.pic_employee} /> {item.name}</Chip>);
        confirmStaff.push(<Chip style={{margin:4,backgroundColor:'none'}} key={item.email} ><Avatar src={item.pic_employee} /> {item.name}</Chip>);
    });
    var sectionStaff = <div style={styles.wrapper}>
      {staffSelected}
      <Chip style={styles.chip} onTouchTap={this.handleTouchTap}> ADD</Chip>
      <Popover
        open={this.state.openSelectStaff}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          {staffList}
        </Menu>
      </Popover>
    </div>;

    var createService;
    var labelAdd = <span>Add</span>
    if(!this.state.createService){
      createService = <RaisedButton onClick={this.handleCreateService} icon={<ContentAdd />}  label={labelAdd} style={{marginTop:'10px'}} />;
    }else{
      const items = [
        <MenuItem key={1} value={"1"} primaryText="Onsite" />,
        <MenuItem key={2} value={"2"} primaryText="Remote" />,
        <MenuItem key={3} value={"3"} primaryText="Document" />,
        <MenuItem key={4} value={"4"} primaryText="Meeting-Intranal" />,
        <MenuItem key={5} value={"5"} primaryText="Meeting-Extranal" />,
        <MenuItem key={6} value={"6"} primaryText="Pre-Install" />,
        <MenuItem key={7} value={"7"} primaryText="Testing" />,
      ];
      // txt detail
      // <div>
      //   <TextField hintText="Detail" onChange={this.handleDetail} style={{width:"90%"}} floatingLabelText="Detail"/>
      // </div>
      createService =
        <div style={{maxWidth: '80%', maxHeight: 400, margin: 'auto'}}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Subject service</StepLabel>
              <StepContent>
                  <GridList
                      cellHeight={180}
                      cols={1} style={{height:180}}
                    >
                    <div>
                        <div><TextField hintText="Subject" onChange={this.handleSubject} style={{width:"90%"}} floatingLabelText="Subject"/></div>

                        <SelectField
                          value={this.state.service_type}
                          onChange={this.handleChangeServiceType}
                          floatingLabelText="Service Type"
                        >
                          {items}
                        </SelectField>
                    </div>

                  </GridList>
                  {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Appointment Datatime</StepLabel>
              <StepContent>
                    <div >
                      <DatePicker hintText="Date" value={this.state.appointment_date} onChange={this.handleAppointment} />
                    </div>
                    <div >
                      <TimePicker format="24hr" hintText="Time" value={this.state.value24} onChange={this.handleChangeTimePicker24}/>
                    </div>
                    <div>
                      <TextField type="number" min={1} value={this.state.expect_duration} onChange={this.handleExpectDuration} hintText="Expect Duration" floatingLabelText="Expect Duration (Hours.)"/>
                    </div>
                <div>
                </div>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Staff</StepLabel>
              <StepContent>
                <div>
                  {sectionStaff}
                </div>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Contact User</StepLabel>
              <StepContent>
                <div>
                  <ServiceReportContactUser onContactUser={this.handleContactUser} projectContact={this.props.projectContact} />
                </div>
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirm Information</StepLabel>
              <StepContent>
                <div>
                        <div><small style={{color:darkBlack}}>Subject:</small> {this.state.subject}</div>
                        <div><small style={{color:darkBlack}}>Detail:</small> {this.state.detail}</div>
                        <div><small style={{color:darkBlack}}>Type:</small> {this.state.service_type_lable}</div>
                        <br/>
                        <div>
                          <small style={{color:darkBlack}}>Appointment Date:</small> <Moment format="YYYY-MM-DD">{this.state.appointment_date}</Moment>
                        </div>
                        <div>
                          <small style={{color:darkBlack}}> Time:</small> <Moment format="HH:mm">{this.state.value24}</Moment>
                        </div>
                        <div><small style={{color:darkBlack}}>Expect Duration:</small> {this.state.expect_duration}</div>
                        <br/>
                        <div><small style={{color:darkBlack}}>Staff:</small> {confirmStaff}</div>
                        <br/>
                        <div><small style={{color:darkBlack}}>Contact</small></div>
                        <div> <small style={{color:darkBlack}}> Name:</small> {this.state.end_user_name}</div>
                        <div> <small style={{color:darkBlack}}> Email:</small> {this.state.end_user_email}</div>
                        <div> <small style={{color:darkBlack}}> Mobile:</small> {this.state.end_user_mobile}</div>
                        <div> <small style={{color:darkBlack}}> Phone:</small> {this.state.end_user_phone}</div>
                        <div> <small style={{color:darkBlack}}> Company:</small> {this.state.end_user_company}</div>
                </div>
                {this.renderStepActions(4)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
    }
    return(
      <div>
        {createService}
      </div>
    )
  }
}

export default ServiceReportCreate;