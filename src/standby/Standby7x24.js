import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Columns, Column } from 're-bulma';
import Avatar from 'material-ui/Avatar';
import ActionStar from 'material-ui/svg-icons/action/grade';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';


class Standby7x24 extends Component {
  constructor(props){
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      // state for tabel
       fixedHeader: true,
       fixedFooter: true,
       stripedRows: false,
       showRowHover: false,
       selectable: false,
       multiSelectable: false,
       enableSelectAll: false,
       deselectOnClickaway: true,
       showCheckboxes: false,

       standby7x24:[],
       dataStandby7x24:[],
       queStandby:[]
     };

  }

  componentDidMount() {
    this.loadData();
  }
  loadData = () =>{
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    var that = this;
    get(Url.standby7x24, formData).then(function(res){
      console.log(res);
      that.setState({standby7x24:res.standby, queStandby:res.data});
    });
  }

  render(){
    var dataStandby7x24 = [];
    this.state.standby7x24.forEach((item, i) => {
      item.is_next_call
      if(item.next_call==="1" && i===0){
        dataStandby7x24.push(
            <Column key={i}>
              <div> <Avatar src={item.pic_full} /> {item.thainame} <ActionStar color={yellow500}/> </div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </Column>
        );
      }else if(item.next_call==="2" && i===1){
        dataStandby7x24.push(
            <Column key={i}>
              <div> <Avatar src={item.pic_full} /> {item.thainame} <ActionStar color={yellow500}/> </div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </Column>
        );
      }else{
        dataStandby7x24.push(
            <Column key={i}>
              <div> <Avatar src={item.pic_full} /> {item.thainame}</div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </Column>
        );
      }
    });
    var eleStandby = <Columns>{dataStandby7x24}</Columns>


    return(
      <MuiThemeProvider>
        <div>
              <NavCompoment info={this.props.info} />
              <div>
                <Card style={{backgroundColor:'initial'}}>
                  <CardHeader style={{padding:"20px 20px 0px 20px"}}
                    title={"Standby7x24 "}
                  />
                  <CardText>
                      {eleStandby}
                  </CardText>

                </Card>
              </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Standby7x24;
