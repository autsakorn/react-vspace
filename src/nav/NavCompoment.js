import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {red500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import LogoPng from '../vspace.png';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
class NavCompoment extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {open: false,openRight:false};
  }
  handleSignOut(){
    localStorage.removeItem("case_email");
    localStorage.removeItem("case_token");
    location.reload();
  }
  handlevSpace(){
    localStorage.removeItem("project_sid");
    localStorage.removeItem("currectPage");
    localStorage.removeItem("tasks_sid");
    location.reload();
  }
  handleToggleRight = () => this.setState({openRight: !this.state.openRight});
  handleCloseRight = () => this.setState({openRight: false});

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  handleProfile = () => {
    localStorage.setItem("currectPage","Profile");
    location.reload();
  }
  render(){
    const style = {
      title: {
        fontSize:14,
        color:'#ffffff'
      },
      toolbar: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#ffffff',
      },
      search: {color:'#FFFFFF'},
      toolbarGroup: {
        width: '33%'
      },
      toolbarGroupCenter: {
        width: '34%',
        display:'block', textAlign:'center', color:'#FFFFFF'
      },
      link: {
        color: lightBlack,
        textDecoration:'none',
        marginLeft:'5px'
      }
    }

    var avatar;
    if(this.props.info.pic_full){
      avatar = <Avatar style={{'marginTop':'6px'}} src={this.props.info.pic_full} />;
    }else{
      avatar = <Avatar style={{'marginTop':'6px'}} >{this.props.info.name.charAt(0)}</Avatar>;
    }
    // if(window.innerWidth<376){
    //   avatar = <span></span>
    // }
    // <TextField inputStyle={style.search} hintStyle={style.search}
    //   hintText="Search"
    // />

    var listMenu = [];
    var that = this;
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      listMenu.push(
        <ListItem onTouchTap={
          ()=>{
            localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");localStorage.removeItem("currectPage");
            location.reload();
          }
        } key={-1} style={{color:lightBlack,marginLeft:'5px'}} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
        >{"Boards"}</ListItem>
      );
      listMenu.push(
        <ListItem onTouchTap={
          ()=>{
            localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");localStorage.setItem("currectPage", "HistoryAppointment");
            location.reload();
          }
        } key={-2} style={{color:lightBlack,marginLeft:'5px'}} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
        >{"History"}</ListItem>
      );

    // } else {
        this.props.info.menus.forEach(function(item,i){
            // console.log(item);
            if(item.list.length>0){
              if(item.list[0].sid==="88"){
                listMenu.push(<ListItem onTouchTap={()=>{
                  localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");
                  localStorage.setItem("currectPage","Ticket"); }} key={i} style={{color:lightBlack,marginLeft:'5px'}} href={item.list[0].link} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
                >{item.name}</ListItem>);
              }else if(item.list[0].sid==="85"){
                listMenu.push(<ListItem onTouchTap={()=>{
                  localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");
                  localStorage.removeItem("currectPage"); }} key={i} style={{color:lightBlack,marginLeft:'5px'}} href={item.list[0].link} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
                >{item.name}</ListItem>);
              }else if(item.list[0].sid==="76"){
                listMenu.push(<ListItem onTouchTap={()=>{
                  localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");
                  localStorage.setItem("currectPage","ApproveService"); }
                } key={i} style={{color:lightBlack,marginLeft:'5px'}} href={item.list[0].link} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
                >{item.name}</ListItem>);
              }else if(item.list[0].sid==="91"){
                listMenu.push(<ListItem onTouchTap={()=>{
                  localStorage.removeItem("project_sid");localStorage.removeItem("tasks_sid");
                  localStorage.setItem("currectPage","Standby7x24"); }
                } key={i} style={{color:lightBlack,marginLeft:'5px'}} href={item.list[0].link} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
                >{item.name}</ListItem>);
              } else{
                listMenu.push(<ListItem onTouchTap={()=>{localStorage.removeItem("project_sid")}} key={i} style={{color:lightBlack,marginLeft:'5px'}} href={item.list[0].link} initiallyOpen={true} rightIcon={<NavigationChevronRight />}
                  // nestedItems={[
                  //         <ListItem key={1} primaryText="Drafts" />,
                  //       ]}
                >{item.name}</ListItem>);
              }
            }
        });
    // }// END ELSE
    // console.log(LogoPng);
    var logo = <span><img alt="vSpace" src="http://vspace.in.th/img/vspace.png" style={{height:48}} /></span>;
    var iconMenuLeft = <ActionViewModule style={{color:'#FFFFFF', height:36,width:36}} />
    return(
      <Toolbar style={style.toolbar}>
        <ToolbarGroup style={style.toolbarGroup}>
            <FlatButton style={{color:'#FFF','marginLeft':'-24px'}}
              label={iconMenuLeft}
              onTouchTap={this.handleToggle}
            />
            <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <div>
                <List>
                  <div><Subheader>Menus</Subheader></div>
                  {listMenu}
                </List>
              </div>
            </Drawer>
        </ToolbarGroup>
        <ToolbarGroup style={style.toolbarGroupCenter}>

          <a onTouchTap={this.handlevSpace} to={"/"}>
            <ToolbarTitle  style={{'cursor':'pointer','color':'#FFFFFF',textAlign:'center',paddingRight:'0px'}} text={logo}>
            </ToolbarTitle>
          </a>
        </ToolbarGroup>
        <ToolbarGroup style={{'display':'inline','width':'33%','textAlign':'right'}}>
          <ToolbarTitle style={style.title} text="">
          </ToolbarTitle>

          <span onTouchTap={this.handleToggleRight}>
            {avatar}
          </span>
          <Drawer
            docked={false} openSecondary={true}
            width={260}
            open={this.state.openRight}
            onRequestChange={(openRight) => this.setState({openRight})}
          >
            <div style={{textAlign:'left'}}><Subheader>{this.props.info.email}</Subheader></div>
            <MenuItem style={{textAlign:'left'}} onTouchTap={this.handleProfile} >Profile</MenuItem>
            <MenuItem style={{textAlign:'left'}} onTouchTap={this.handleSignOut}>Sign Out</MenuItem>
          </Drawer>

        </ToolbarGroup>

      </Toolbar>
    )
  }
}
export default NavCompoment;
