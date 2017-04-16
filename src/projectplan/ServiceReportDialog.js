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
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialMood from 'material-ui/svg-icons/social/mood';
import Drawer from 'material-ui/Drawer';
// import ContentAdd from 'material-ui/svg-icons/content/add';
class ServiceReportDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      serviceReport:this.props.serviceReport,
      projectContact:this.props.projectContact,
      creatingService:true
    };
  }
  handleOpen = () => {
    this.setState({creatingService:true,open: true});
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
  componentWillUnmount(){
    this.setState({open:false});
  }
  handleCreatedService = (task) => {
    // this.props.onCreatedService();
    // var serviceReport = this.state.serviceReport;
    // serviceReport.push({
    //   sid:1,
    //   subject_service_report:"TEST",
    //   service_type_name:"",
    //   appointment:""
    // });
    this.setState({serviceReport:task});
  }

  render(){
    const styles = {
      radioButton: {
        marginTop: 16,
      },
      chip: {margin:2}
    };
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    var serviceReport = [];
    var listServiceReport;
    var chipServiceReport = [];
      for (let i = 0; i < this.state.serviceReport.length; i++) {
        // serviceReport.push(
        //   <div key={i}>
        //     <span>{i+1} {this.state.serviceReport[i].subject_service_report} {this.state.serviceReport[i].engineer}</span>
        //   </div>
        // );
        var iconStatusService;
        if(this.state.serviceReport[i].last_status>400){
          iconStatusService = <SocialMood />
        }else{
          iconStatusService = <SocialSentimentNeutral/>
        }
        chipServiceReport.push(
          <Chip style={{margin:2,overflow: 'auto',maxWidth: '270px'}} key={i}><Avatar icon={iconStatusService} />{this.state.serviceReport[i].subject_service_report}</Chip>
        );
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


    var listServiceReport;
    if(!this.state.creatingService){
        listServiceReport =
          <div style={{padding:10}}>
            <br/>
            <RaisedButton onTouchTap={()=>{this.setState({creatingService:true}); }} icon={<ContentAdd />} label={"ADD"} />
            <List>
              <Subheader>รายการ Service Report ({this.state.serviceReport.length})</Subheader>
              {serviceReport}
            </List>
          </div>;
    }else{
      listServiceReport =
      <div style={{padding:10}}>
        <br/>
        <RaisedButton onTouchTap={()=>{this.setState({creatingService:false}); }} label={"List Service Report"} />
        <ServiceReportCreate createService={this.state.creatingService} onCloseDialog={this.handleClose}
          onCreatedService={this.handleCreatedService} onStatusCreating={this.handleStatusCreating}
          caseSid={this.props.caseSid} projectContact={this.props.projectContact} serviceReport={this.props.serviceReport}
          listUserCanAddProject={this.props.listUserCanAddProject} />
      </div>
    }


    chipServiceReport.push(<Chip key={-1} onTouchTap={this.handleOpen} style={styles.chip}><Avatar color="#fff" icon={<ContentAdd />} />Add</Chip>);
    //<i> จำนวน {this.state.serviceReport.length}</i>
    const label = <div><div style={{display:'flex',flexWrap:'wrap',float:'left'}}>{chipServiceReport}</div><div style={{clear:'both'}}></div></div>;
    return (
      <div>
        <div><small style={{color:lightBlack}}>Service Report ({this.state.serviceReport.length})</small></div><div style={{textAlign:'right'}}>{label}</div>

        <Drawer openSecondary={true} width={'80%'} open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <div style={{minHeight:'200px'}}>
              {listServiceReport}
            </div>
        </Drawer>

      </div>
    );
  }
}

// <Dialog contentStyle={{width:'90%','maxWidth':'none'}}
//   title="Service Report"
//   actions={actions}
//   modal={false}
//   open={this.state.open}
//   onRequestClose={this.handleClose}
//   autoScrollBodyContent={true}
// >
// </Dialog>
export default ServiceReportDialog;
