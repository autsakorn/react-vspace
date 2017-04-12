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
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';

class TicketChecklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:this.props.item,
      sid: this.props.sid,
      openAddChecklist:false,
      newItemChecklist:'',
      newItemWithIn:'',
      unitTime:'Minute',
      status:'Normal',
      editing_sid:'',
      editing_name:'',
    };
  }
  handleAddNewItem = (e) => {
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("new_checklist", this.state.newItemChecklist);
    formData.append("ticket_sid", this.state.sid);
    formData.append("unit", this.state.unitTime);
    formData.append("within", this.state.newItemWithIn);

    var item = this.state.item;
    var that = this;
    Put(Url.addChecklist, formData).then(function(res){
      item.need_checklist = res.checklist;
      that.setState({item:item,
        newItemChecklist:"",
        newItemWithIn:'',
        unitTime:'Minute'
      });
    });
    e.preventDefault();
  }
  onChangeNewItemChecklist = (e) => {
    this.setState({newItemChecklist:e.target.value});
  }
  handleDoChecklist = (e, k, v) => {
    e.preventDefault();
    var value;
    if(e.target.checked){
      value = 0;
    }else{
      value = 1;
    }
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("checklist_sid", e.target.value);
    formData.append("value",value);
    Put(Url.doChecklist, formData).then(function(res){
      console.log(res);
    });
  }
  handleChangeEditItem = (e) => {
    this.setState({editing_name:e.target.value});
  }
  handleTouchItem = (sid,name, within, unit) => {
    this.setState({
      editing_sid:sid,editing_name:name, status:"Editng",openAddChecklist:false,
      unitTime:unit,newItemWithIn:within
    });
  }
  handleUpdateEdit = () => {
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("new_checklist", this.state.editing_name);
      formData.append("checklist_sid", this.state.editing_sid);
      formData.append("ticket_sid",this.state.sid);
      formData.append("unit", this.state.unitTime);
      formData.append("within", this.state.newItemWithIn);

      var item = this.state.item;
      var that = this;
      Put(Url.updateChecklist, formData).then(function(res){
        console.log(res);
        item.need_checklist = res.checklist;
        that.setState({
          item:item, newItemChecklist:"",newItemWithIn:'',
          unitTime:'Minute',editing_sid:'',editing_name:''
        });
      });
  }
  handleDeleteItem = () => {
    if(confirm("Delete item?")){
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("checklist_sid", this.state.editing_sid);
      formData.append("ticket_sid",this.state.sid);
      var item = this.state.item;
      var that = this;
      Put(Url.removeChecklist, formData).then(function(res){
        console.log(res);
        item.need_checklist = res.checklist;
        that.setState({item:item, newItemChecklist:""});
      });
    }
  }
  onChangeNewItemWithIn = (e) => {
    this.setState({newItemWithIn:e.target.value});
  }
  render(){
    var unitControl;

    unitControl =
      <span>
        <RaisedButton label={"Minute"} onTouchTap={ ()=>{this.setState({unitTime:"Minute"})} } primary={(this.state.unitTime==="Minute")?true:false} />
        <RaisedButton label={"Hour"} onTouchTap={ ()=>{this.setState({unitTime:"Hour"})} } primary={(this.state.unitTime==="Hour")?true:false} />
        <RaisedButton label={"Day"} onTouchTap={ ()=>{this.setState({unitTime:"Day"})} } primary={(this.state.unitTime==="Day")?true:false} />
      </span>;

    var addAnItemChecklist;
    if(this.state.openAddChecklist){
      addAnItemChecklist =
        <div>
          <form onSubmit={this.handleAddNewItem}>
            <div>
              <TextField floatingLabelText="Checklist Name" onChange={this.onChangeNewItemChecklist} hintText="Add an item..." value={this.state.newItemChecklist}  />
            </div>
            <div>
              <br/>
              <div><span style={{color:lightBlack}}>Optional: Target Datetime</span></div>
              <TextField type="number" min="0" onChange={this.onChangeNewItemWithIn} hintText="within ... from create task" value={this.state.newItemWithIn}  />
              <span style={{margin:'0px 10px'}}>Unit: </span>
                {unitControl}
            </div>
            <div>
              <RaisedButton onTouchTap={this.handleAddNewItem} primary={true} label='Sumbit' />
              <FlatButton onTouchTap={()=>{this.setState({openAddChecklist:!this.state.openAddChecklist})} }  label={<ContentClear />}  />
            </div>
          </form>
        </div>
    }else{
      addAnItemChecklist = <div onTouchTap={()=>{this.setState({openAddChecklist:true,editing_sid:''})} }><small style={{color:grey400}}>Add an item...</small></div>
    }

    var checkListItem = [];
    this.state.item.need_checklist.forEach((item,i)=>{
        var defaultChecked = false;
        if(item.result==="1"){
          defaultChecked = true;
        }
        if(this.state.editing_sid===item.sid){
            checkListItem.push(
              <div style={{padding:0,marginTop:5}} key={i}>
                <div style={{display:'flex'}} >
                  <Checkbox  onTouchTap={this.handleDoChecklist} defaultChecked={defaultChecked}
                    label={""} value={item.sid}
                    style={{color: lightBlack, width:'initial'}}
                  />
                  <div style={{color:lightBlack}}>
                    <div>
                        <TextField onChange={this.handleChangeEditItem} hintText="Edit item..." value={this.state.editing_name} />
                        <FlatButton secondary={true} onTouchTap={this.handleDeleteItem} >Delete</FlatButton>
                    </div>
                    <div>
                        <TextField type="number" min="0" onChange={this.onChangeNewItemWithIn} hintText="within ... from create task" value={this.state.newItemWithIn}  />
                        <span style={{margin:'0px 10px'}}>Unit: </span>
                          {unitControl}
                    </div>
                  </div>
                </div>
                <div style={{marginLeft:40}}>
                  <RaisedButton onTouchTap={this.handleUpdateEdit} primary={true} label='Sumbit' />
                  <FlatButton onTouchTap={()=>{this.setState({openAddChecklist:false,editing_sid:''})} }  label={<ContentClear />}  />
                </div>
              </div>
            )
        }else{
            var withinShow;
            if(item.within>0){
              withinShow = <span style={{marginLeft:15}}>({item.within} {item.unit}) <small style={{marginLeft:15,float:'right'}}>Target {item.target_datetime}</small></span>;
            }
            checkListItem.push(
                <div style={{padding:0,marginTop:5}} key={i} onTouchTap={()=>this.handleTouchItem(item.sid, item.name, item.within, item.unit)}>
                  <div style={{display:'flex'}} >
                    <Checkbox  onTouchTap={this.handleDoChecklist} defaultChecked={defaultChecked}
                      label={""} value={item.sid}
                      style={{color: lightBlack, width:'initial'}}
                    />
                    <div style={{color:lightBlack}}><span>{item.name}</span> {withinShow}</div>
                  </div>
                </div>
            )
        }
    });
    return(
      <div>
        <div><small style={{color:lightBlack}}>Check List</small></div>
        <br/>
        <List>
          {checkListItem}
        </List>
        <div style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee'}}>{addAnItemChecklist}</div>
        <br/>
        <Divider /><br/>
      </div>
    )
  }
}

class TicketDrawer extends Component {
  constructor(props){
      super(props);
      this.state = {
        item:this.props.case,
        editing:false,
        sid:this.props.sid,
        name:this.props.name,
        projectContact: this.props.projectContact,
        owner_value:this.props.owner_value,
        listUserCanAddProject:this.props.listUserCanAddProject,
        open: false,
        status: this.props.status,
        mandaysCase: this.props.mandaysCase,
        projectInfo:this.props.projectInfo,
        openAddChecklist:false,
        newItemChecklist:""
      };
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

  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {

    this.setState({open:false});
    this.props.onChangeStaffCase(this.state.sid, email);
  }
  handleTxtChange = (e) => {
    var value = e.target.value;
    var that = this;

    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('ticket_sid', this.state.sid);
    formData.append('new_subject', value);
    get(Url.casemodifySubject,formData).then(function(res){
      console.log(res);
      that.setState({name:value});
      that.props.onChangeSubject(value);
    });

  }

  render(){

    const iconStyles = {
      marginRight: 24,
    };
    const styles = {
      box: {
        'padding':'10px 10px','margin':'0px 4px',
        // 'border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px','background': '#ffffff', 'borderRadius': '3px'
      },
      style: {
        margin: 4,
      },
      owner: {'textAlign':'right'},
      relative: {'position':'relative'}
    }
    // if(this.state.status){
    //   console.log(this.state.status);
    // }
    var labelOwnerCase = (this.state.item.owner_thainame)?(this.state.item.owner_thainame):'Owner?';
    var avatar = <div style={styles.relative}><Avatar src={this.state.item.pic_full} /> <small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

    var jobData;
    if(this.state.item.task){
      jobData = <ServiceReportDialog onCreatedService={this.handleCreatedService} caseSid={this.state.sid} projectContact={this.props.projectContact} listUserCanAddProject={this.props.listUserCanAddProject} serviceReport={this.state.item.task} />
    }else{
      jobData = <span></span>
    }

    var checkList = <TicketChecklist sid={this.state.sid} item={this.state.item} />;


    var removing;
    if(this.state.item.task && this.state.item.task.length>0){
      removing = <span></span>
    }else{
      removing = <div><RaisedButton label="Remove" onTouchTap={this.handleDelete} secondary={true} style={styles.style} /><br/><br/><Divider /><br/></div>
    }

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
      // CONTROL MANDAYS
      var control_manday;
      var control_service_report;
      if(this.state.projectInfo.project_permission==="1" || this.state.projectInfo.project_permission==="2"){
        control_manday =
        <div>
          <div>
            <div><small style={{color:lightBlack}}>Estimate Man-Hours (Hours.)</small></div>
            <div style={{'textAlign':'left'}}>
                <TextField type="number" min={1} value={manDaysCase} onChange={this.handleManDaysCase} hintText="Man Hours" />
            </div>
          </div>
          <br/>
          <Divider />
          <br/>
        </div>;

        control_service_report =
        <div>
          <div>{jobData}</div>
          <br/>
          <Divider />
          <br/>
        </div>;
      }else{
        control_manday = <div></div>;
        control_service_report = <div></div>;
      }


      return(
        <div style={styles.box}>

            <div>
              <div><small style={{color:lightBlack}}>Subject</small></div>
              <form onSubmit={this.handleSubmit}>
              <TextField fullWidth={true}  hintText="Subject" value={this.state.name} onChange={this.handleTxtChange} />
              </form>
              <br/>
              <div>
                <div><small style={{color:lightBlack}}>Owner</small></div>
                  <div>
                    <div style={{'height':'50px'}}>
                      {avatar}
                    </div>
                    <div style={{textAlign:'left'}}>
                      <OwnerDialog onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.state.listUserCanAddProject} />
                    </div>
                  </div>
                  <br/>
              </div>
              <Divider />
              <br/>

              {control_service_report}

              {control_manday}

              {checkList}
              <div style={{'textAlign':'right'}}>
                {removing}
              </div>
              <div style={{'textAlign':'right'}}><small>Created {this.state.item.create_datetime}</small></div>
            </div>
        </div>
      );
                    // <RaisedButton label="Close" onTouchTap={this.handleTextareaClose}  style={styles.style} />
  }
}

export default TicketDrawer;
