import React, { Component } from 'react';
import ServiceReportDialog from './ServiceReportDialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import OwnerDialog from './OwnerDialog';
import SocialPeople from 'material-ui/svg-icons/social/people';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';

class CardItem extends Component {
  constructor(props) {
    super(props);
    // console.log('CardItem props', this.props.case.owner);
    this.state = {
      item:this.props.case,
      editing:false,
      sid:this.props.case.sid,
      name:this.props.case.subject,
      projectContact: this.props.projectContact,
      owner_value:this.props.case.owner,
      listUserCanAddProject:this.props.listUserCanAddProject,
      open: false,
      status: this.props.case.status,
      mandaysCase: this.props.case.man_days
    };
    this.handleEditing = this.handleEditing.bind(this);
    this.handleTxtChange = this.handleTxtChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextareaClose = this.handleTextareaClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // console.log(this.state.item);
  }
  handleEditing(){
    // this.setState({status:"Editing"});
    this.props.onEdit(this.state.sid);
  }
  handleTxtChange(e){
    this.setState({name:e.target.value});
    // this.props.onEditChange(this.state.sid, e.target.value);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.onEditChange(this.state.sid, this.state.name);
    this.props.onEdit(0);
  }
  handleTextareaClose(){
    // this.setState({status:"Normal"});
    this.props.onEdit(0);
  }
  handleDelete(){
    if(confirm("Are you sure delete?")){
      this.props.onDelete(this.state.sid);
    }
  }
  handleChange = (event, index, owner_value) => this.setState({owner_value});
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  // handleSelectOwner = (e, index, value) => {
  //     // console.log(e.currentTarget.dataset.id);
  //     this.setState({open:false});
  //     // this.setState({item.owner_thainame:e.currentTarget.dataset.id});
  //     // this.props.case.owner_thainame = e.currentTarget.dataset.id;
  //     this.props.onChangeStaffCase(this.state.sid, e.currentTarget.dataset.id);
  // };
  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {
    var formData = new FormData();
    // alert(email);
    // alert(pic_employee);
    this.setState({open:false});
    this.props.onChangeStaffCase(this.state.sid, email);
  }
  handleCreatedService = () => {
    console.log(this.state);

    var that = this;
    that.props.onEdit(0);
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('project_sid',localStorage.getItem("project_sid"));
    get(Url.projectDetail, formData).then(function(res){
      res.data.forEach((value1) => {
        value1.case.forEach((value2) => {
          if(value2.sid===that.state.sid){
            that.setState({
              sid:that.state.sid,
              item:value2,
              status:"Editing",
              mandaysCase:that.state.mandaysCase
            });
            that.props.onEdit(that.state.sid);
          }
        });
      });
    });
  }
  handleManDaysCase = (e) => {
    var that = this;
    var newManDay = e.currentTarget.value;
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("man_days", newManDay);
    formData.append("ticket_sid", this.state.sid);

    Put(Url.changeMandaysCase, formData).then(function(res){
      that.setState({mandaysCase:newManDay});
    });
  }
  render(){
    const iconStyles = {
      marginRight: 24,
    };
    const styles = {
      box: {
        'padding':'10px 10px','margin':'0px 4px','border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px','background': '#ffffff', 'borderRadius': '3px'
      },
      style: {
        margin: 4,
      },
      owner: {'textAlign':'right'},
      relative: {'position':'relative'}
    }
    if(this.state.status){
      console.log(this.state.status);
    }
    var labelOwnerCase = (this.state.item.owner_thainame)?(this.state.item.owner_thainame):'Owner?';
    var avatar = <div style={styles.relative}><Avatar src={this.state.item.pic_full} /> <small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

    var jobData;
    if(this.state.item.task){
      jobData = <ServiceReportDialog onCreatedService={this.handleCreatedService} caseSid={this.state.sid} projectContact={this.props.projectContact} listUserCanAddProject={this.props.listUserCanAddProject} serviceReport={this.state.item.task} />
    }else{
      jobData = <span></span>
    }

    var removing;
    if(this.state.item.task && this.state.item.task.length>0){
      removing = <span></span>
    }else{
      removing = <RaisedButton label="Remove" onTouchTap={this.handleDelete} secondary={true} style={styles.style} />
    }

    if(this.props.case.status==="Editing"){
      var staffList = this.props.listUserCanAddProject.map((item,k) => {
          return  <ListItem key={k}
            leftAvatar={<Avatar src={item.pic_employee} />}
            primaryText={item.thainame}
            onTouchTap={this.handleSelectOwner} data-id={item.emailaddr}
            secondaryText={
              <p>
                {item.engname} <br/>
                {item.emailaddr}
              </p>
            }
            secondaryTextLines={2}
          />
      });

      var manDaysCase = (this.state.mandaysCase)?this.state.mandaysCase:'0';
      return (
        <div style={styles.box}>
          <form onSubmit={this.handleSubmit}>
            <div className="form">

              <TextField floatingLabelText="Subject" hintText="Subject" value={this.state.name} onChange={this.handleTxtChange} />
              <br/>
              <div>
                <div><small style={{color:lightBlack}}>Owner</small></div>
                  <div>
                    <div style={{'height':'50px'}}>
                      {avatar}
                    </div>
                    <div style={{textAlign:'right'}}>
                      <OwnerDialog onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.state.listUserCanAddProject} />
                    </div>
                  </div>
                  <br/>
              </div>
              <Divider />
              <br/>

              <div>{jobData}</div>
              <br/>
              <Divider />
              <br/>

              <div>
                <div style={{'textAlign':'left'}}>
                    <TextField type="number" min={1} value={manDaysCase} onChange={this.handleManDaysCase} hintText="Man Days" floatingLabelText="Man Days (Days.)"/>
                </div>
              </div>
              <br/>
              <Divider />
              <br/>
              <div style={{'textAlign':'right'}}>
                {removing}
                <RaisedButton label="Close" onTouchTap={this.handleTextareaClose}  style={styles.style} />
              </div>
            </div>
          </form>
        </div>
      )
    }else{
      return (
        <div data-id={this.state.sid} style={styles.box} onTouchTap={this.handleEditing}>
            <div>
              {this.state.item.subject}
            </div>
            <div>{avatar}</div>
        </div>
      );
    }
  }
}
export default CardItem;

// <CardActions>
// </CardActions>
// <CardText expandable={true}>
// </CardText>
// <article data-id={this.state.sid} className="card" onClick={this.handleEditing} >
//   <header >{this.state.item.subject}</header>
//   <div className="detail">
//     <span><i className="fa fa-fw fa-user"></i> {(this.state.item.owner_thainame)?this.state.item.owner_thainame:'ยังไม่กำหนด Owner'}</span>
//     <span className="pull-right"><i className="fa fa-fw fa-clock-o"></i> 1 </span>
//   </div>
// </article>
