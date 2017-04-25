import React, { Component } from 'react';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import TicketDrawer from '../ticket/TicketDrawer';
import TicketDetail from '../ticket/TicketDetail';
import { Columns,Column } from 're-bulma';
import Drawer from 'material-ui/Drawer';


class TicketItem extends Component {
  constructor(props){
    super(props);
    this.state = {item:this.props.item,openTicketDrawer:false,data_ticket_detail:null,listUserCanAddProject:this.props.listUserCanAddProject};
  }
  componentDidMount(){
    // this.callDataTicket(this.state.item.sid);
  }
  handleOpenTicketDrawer = () => {
    this.callDataTicket(this.state.item.sid);

    // this.setState({openTicketDrawer:true});
    // console.log(this.state);
  }
  callDataTicket(ticket_sid){
    if(this.props.ticket_sid!==null){
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token", InfoGen.token);
      formData.append("ticket_sid", ticket_sid);
      var that = this;
      get(Url.ticketDetail,formData).then(function(res){
        // console.log(res);
        that.setState({ticket_sid:ticket_sid, data_ticket_detail:res.data,
          // listUserCanAddProject:res.canAssignTo
        });
        that.setState({openTicketDrawer:true});
      });
    }
  }
  render(){
    const styles = {
      styleBorder: {
        border: '1px solid #fafbf9',
        height:120,
        borderRadius: '3px',
        // margin:'10px 10px 0px 10px'
        backgroundColor: '#fafbfc'
      },
      title: {
        cursor: 'pointer',
      },
    }
    var item = this.state.item;

    var ticketDetail;
    if(this.state.data_ticket_detail){
      ticketDetail =
      <Drawer width={"100%"} onRequestChange={(openTicketDrawer) => this.setState({openTicketDrawer})} openSecondary={true} docked={false} open={this.state.openTicketDrawer} >
        <TicketDetail listUserCanAddProject={this.state.listUserCanAddProject} projectContact={[]} closeWindow={()=>{ this.setState({openTicketDrawer:false}) }} ticket_sid={this.state.item.sid} data={this.state.item} />
      </Drawer>
    }

    var avatarCreated = <Avatar src={item.created_pic_full} />;

    var avatarOwner = <Avatar style={{width:'90%', height:'initial'}} src={item.pic_full} />;
    return(
      <div style={styles.styleBorder}>
        <Paper onTouchTap={this.handleOpenTicketDrawer} zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
          <Column style={{width:'30%',float: 'left',marginTop: 0,paddingTop: 0}}>
            {avatarOwner}
          </Column>
          <div>{item.subject}</div>
          <div style={{color: lightBlack}}><small>{item.end_user}</small></div>
          <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:4,bottom:22}}>
            <small style={{fontSize:'12px'}}>Created {item.create_datetime}</small>
          </div>
        </Paper>
        {ticketDetail}
      </div>
    );
  }
}

export default TicketItem;
