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

import { Columns } from 're-bulma';
import { Column } from 're-bulma';

import insertCss from 'insert-css';
import css from 're-bulma/build/css';
try {
  if (typeof document !== 'undefined' || document !== null) insertCss(css, { prepend: true });
} catch (e) {}

class TicketDetail extends Component {
  constructor(props){
      super(props);
      this.state = {
        ticket_sid:this.props.ticket_sid
      };

  }

  componentDidMount(){
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
      var {data} = this.props;

      var avatar;
      var labelOwnerCase = (data.thainame)?(data.thainame):'Owner?';
      avatar = <div style={styles.relative}><small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

      return(
        <div >
        <AppBar
          title={<span style={styles.title}>{this.props.data.subject}</span>}
          iconElementLeft={<IconButton><ActionAssignment /></IconButton>}
          />
            <div style={styles.box}>
                <Columns>
                  <Column style={style}>
                      <small style={{color:lightBlack}}>
                        <div>{data.subject}</div>
                        <div>{data.contract_no}</div>
                        <div>{data.urgency}</div>
                        <div>{data.case_type}</div>
                      </small>
                  </Column>
                  <Column style={style}>
                    {avatar}
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
