import React, { Component } from 'react';
import MyApp from './MyApp';
import get from '../config/Get.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ServiceReportCreate from './ServiceReportCreate';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
class ServiceReportDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      serviceReport:this.props.serviceReport,
      projectContact:this.props.projectContact,
      creatingService:false
    };
  }
  handleOpen = () => {
    this.setState({creatingService:false});
    this.setState({open: true});
  };

  handleClose = () => {

    this.setState({open: false});
  };
  handleStatusCreating = () => {
    if(this.state.createService){
      this.setState({creatingService:false});
    }else{
      this.setState({creatingService:true})
    }
  }
  render(){
    const styles = {
      radioButton: {
        marginTop: 16,
      },
    };
    const actions = [

      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const label = <small><i> จำนวน {this.state.serviceReport.length}</i></small>;
    
    var serviceReport = [];
    var listServiceReport;
    if(!this.state.creatingService){
      for (let i = 0; i < this.state.serviceReport.length; i++) {
        // serviceReport.push(
        //   <div key={i}>
        //     <span>{i+1} {this.state.serviceReport[i].subject_service_report} {this.state.serviceReport[i].engineer}</span>
        //   </div>
        // );
        serviceReport.push(
          <ListItem key={i} >
            <div>
              <div>{this.state.serviceReport[i].subject_service_report}</div>
              <div style={{color:lightBlack}}><small>Type: </small><small>{this.state.serviceReport[i].service_type_name}</small></div>
              <div style={{color:lightBlack}}><small>Appointment: </small><small>{this.state.serviceReport[i].appointment}
              <br/>Expect Duration (Hr.): {this.state.serviceReport[i].expect_duration}</small></div>
            </div>
          </ListItem>
        );
      }
      var listServiceReport =
        <List>
          <Subheader>รายการ Service Report ({this.state.serviceReport.length})</Subheader>
          {serviceReport}
        </List>;
    }

    return (
      <div>
        <div><small style={{color:lightBlack}}>Service Report:</small></div><div style={{textAlign:'right'}} onTouchTap={this.handleOpen} >{label}</div>
        <Dialog contentStyle={{width:'90%','maxWidth':'none'}}
          title="Service Report"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >

          <div style={{minHeight:'200px'}}>
            <ServiceReportCreate onStatusCreating={this.handleStatusCreating} caseSid={this.props.caseSid} projectContact={this.props.projectContact} serviceReport={this.props.serviceReport} listUserCanAddProject={this.props.listUserCanAddProject} />
            {listServiceReport}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ServiceReportDialog;
