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

class ServiceReportDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      serviceReport:this.props.serviceReport
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
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

    const label = "View ("+this.state.serviceReport.length+")";

    const serviceReport = [];

    for (let i = 0; i < this.state.serviceReport.length; i++) {
      serviceReport.push(
        <div key={i}>
          <span>{i+1} {this.state.serviceReport[i].subject_service_report} {this.state.serviceReport[i].engineer}</span>
        </div>
      );
    }


    return (
      <div>
        Service Report: <RaisedButton label={label} onTouchTap={this.handleOpen} />
        <Dialog
          title="Service Report"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >


          <div style={{minHeight:'200px'}}>
            <ServiceReportCreate serviceReport={this.props.serviceReport} />
            {serviceReport}
          </div>

        </Dialog>
      </div>
    );
  }
}

export default ServiceReportDialog;
