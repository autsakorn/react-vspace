import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ServiceReportDialog from '../projectplan/ServiceReportDialog';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import FlatButton from 'material-ui/FlatButton';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import OwnerDialog from '../projectplan/OwnerDialog';
import SocialPeople from 'material-ui/svg-icons/social/people';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TicketChecklist from '../ticket/TicketChecklist';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { Columns,Column } from 're-bulma';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';

class TicketDetail extends Component {
  constructor(props){
      super(props);
      this.state = {
        ticket_sid:this.props.ticket_sid,
        data: this.props.data
      };

  }

  componentDidMount(){

  }
  componentUnDidMount(){

  }

  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {

    console.log(email);
    var tmp = this.state.data;
    tmp.owner_thainame = thainame;
    tmp.pic_full = pic_employee;

    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('ticket_sid', this.state.ticket_sid);
    formData.append('new_owner', email);
    var that = this;
    get(Url.editOwnerCase,formData).then(function(res){
      that.setState({open:false,data:tmp});
    });
  }

  handleManDaysCase = (e) => {
    var that = this;
    var newManDay = e.currentTarget.value;
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("man_days", newManDay);
    formData.append("ticket_sid", this.state.ticket_sid);

    var tmp = this.state.data;
    tmp.man_days = newManDay;
    that.setState({data:tmp});
    Put(Url.changeMandaysCase, formData).then(function(res){

    });
  }

  render(){

    const iconStyles = {
      marginRight: 24,
    };
    const styles = {
      box: {
        'padding':'10px 10px',
        'margin':'0px 4px',
        // 'border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px',
        'background': '#ffffff', 'borderRadius': '3px'
      },
      style: {
        margin: 4,
      },
      owner: {'textAlign':'right'},
      relative: {'position':'relative'},
      title: {
        cursor: 'pointer',
      },
      relative: {'position':'relative'}
    }
    const style = { padding: '10px' };


    if(this.props.data!==null){
      var {data} = this.state;

      var avatar;
      var labelOwnerCase = (data.owner_thainame)?(data.owner_thainame):'Owner?';
      avatar = <div style={styles.relative}><Avatar src={data.pic_full} /> <small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

      var owner =
      <Card isFullwidth>
        <CardHeader>
          <CardHeaderTitle>
            <small style={{color:lightBlack}}>Owner</small>
          </CardHeaderTitle>
        </CardHeader>
        <CardContent>
          <Content>
            <small style={{color:lightBlack}}>
            <div style={{'height':'50px'}}>
              {avatar}
            </div>
            <div style={{textAlign:'left'}}>
              <OwnerDialog onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.props.listUserCanAddProject} />
            </div>
            </small>
          </Content>
        </CardContent>
      </Card>;


      var jobData;
      // if(data.task.length>0){
        jobData = <ServiceReportDialog serviceReport={data.task} onCreatedService={this.handleCreatedService} caseSid={this.props.ticket_sid} projectContact={this.props.projectContact} listUserCanAddProject={this.props.listUserCanAddProject}  />
      // }else{
        // jobData = <span></span>
      // }
      var control_service_report =
      <div>
        <div>{jobData}</div>
      </div>;

      var manDaysCase = (data.man_days)?data.man_days:'0';
      var control_manday;
        control_manday =
        <div>
            <Card isFullwidth>
              <CardHeader>
                <CardHeaderTitle>
                  <small style={{color:lightBlack}}>Estimate Man-Hours (Hours.)</small>
                </CardHeaderTitle>
              </CardHeader>
              <CardContent>
                <Content>
                <div style={{'textAlign':'left'}}>
                    <TextField type="number" min={1} value={manDaysCase} onChange={this.handleManDaysCase} hintText="Man Hours" />
                </div>
                </Content>
              </CardContent>
            </Card>
            <br/>
        </div>;

      var checkList = <TicketChecklist sid={data.sid} item={data} />;

      return(
        <div >
        <AppBar
          title={<span style={styles.title}>{this.props.data.subject}</span>}
          iconElementLeft={<IconButton onTouchTap={()=>{this.props.closeWindow()}}><NavigationClose /></IconButton>}
          />
            <div style={styles.box}>
                <Columns>
                  <Column size="isOneThird" style={style}>

                    <Card isFullwidth>
                      <CardHeader>
                        <CardHeaderTitle>
                          <small style={{color:lightBlack}}>{data.subject}</small>
                        </CardHeaderTitle>
                      </CardHeader>
                      <CardContent>
                        <Content>
                          <small style={{color:lightBlack}}>
                            <div>{data.contract_no}</div>
                            <div>{data.urgency}</div>
                            <div>{data.case_type}</div>
                            <div>{data.end_user}</div>
                            <div>{data.end_user_site}</div>
                            <div>{data.end_user_contact_name}</div>
                            <div>{data.end_user_email}</div>
                            <div>{data.end_user_mobile}</div>
                            <div>{data.end_user_phone}</div>
                            <div>{data.end_user_company_name}</div>
                          </small>
                        </Content>
                      </CardContent>
                    </Card>
                    <br/>
                    {owner}
                  </Column>
                  <Column style={style}>


                    {control_service_report}

                    {control_manday}

                    {checkList}
                  </Column>
                </Columns>

            </div>
        </div>
      );
    }else{
      return(<div />);
    }
                    // <RaisedButton label="Close" onTouchTap={this.handleTextareaClose}  style={styles.style} />
  }
}

export default TicketDetail;
