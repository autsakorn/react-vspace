// view for Approve Taxi and OT Request
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionTaxi from 'material-ui/svg-icons/maps/local-taxi';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    margin:'auto',
    // height: 450,
    // overflowY: 'auto',
  },

  styleBorder: {
    border: '1px solid #fafbf9',
    height:120,
    borderRadius: '3px',
    // margin:'10px 10px 0px 10px'
    backgroundColor: '#fafbfc'
  },
  styleBorderNew: {
    border: '1px dashed #838383',
    height:120,
    borderRadius: '3px',
    backgroundColor:'#fff'
  },
  style:{
    margin : 12,
  }
};

class ApproveServiceDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  render(){

    var detailBody = [];
    this.props.data.forEach((item, i) => {

      if(parseInt(item.status)>=100){
        var rightIcon, dataSecondary;
        if(item.status==="300" || item.status==="600"){
          rightIcon = <ActionTaxi/>;
          dataSecondary = item.create_datetime + "     Taxi Fare : " + item.taxi_fare

        }else{
          rightIcon = <div/>
        }
        if(item.status==="600"){
          item.service_status_name = "กลับถึงปลายทาง";
        }
        detailBody.push(
          <div key={i} data-id={item.sid}>
            <ListItem
               primaryText={item.engineer_thainame+ " "+ item.service_status_name}
               secondaryText={dataSecondary}
               leftIcon={<ActionAlarm/>}
               rightIcon={rightIcon}
             />
          </div>
        );
      }

      });
    return(
        <div>
          <List>
            <Subheader>Activity log</Subheader>
            {detailBody}
            <RaisedButton label="Approve" primary={true}  style={styles.style}/>
            <RaisedButton label="Pending" style={styles.style}/>

          </List>
        </div>
    )
  }

}

export default ApproveServiceDetail;
