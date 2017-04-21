// view for Approve Taxi and OT Request
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
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {GridList} from 'material-ui/GridList';
import ApproveServiceDetail from '../approval/ApproveServiceDetail';


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
  }
};

class ApproveService extends Component {
  constructor(props){
    super(props);

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

      //  state for drawer
        open: false,
        openSecondary:true,


        requestTaxi:[],

      //state for select dropdown
        values: [],
        valueOwner:1,
        valueStatus:1,
        tasks_sid:null,
        data_detail:[]
     };

  }

  getDataFromServer(tasks_sid){
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    formData.append('tasks_sid', tasks_sid);
    var that = this;
    get(Url.approveServiceDetail, formData).then(function(res){
      console.log(res);
      // that.setState({});
      that.setState(
        {open: !that.state.open, tasks_sid:tasks_sid, data_detail:res.data}
      );

    });
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    var that = this;
    get(Url.taxiService, formData).then(function(res){
      console.log(res);
      that.setState({requestTaxi:res.data});
    });
  }



// handle for Drawer
  handleSelectRequest = (tasks_sid) =>{
    this.getDataFromServer(tasks_sid);
  }
  render(){

    const {values, valuesOwner} = this.state;
    var numberColumn = 5;
    if(window.innerWidth<376){
      numberColumn = 1;
    }else if(window.innerWidth<768){
      numberColumn = 2;
    }
    var tableBody = [];
    this.state.requestTaxi.forEach((item, i) => {
      tableBody.push(
        <div
          key={i}
          style={styles.styleBorder} onTouchTap={
            ()=>{this.handleSelectRequest(item.sid)}
          } data-id={item.sid}
        >
          <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
            <div>{item.no_task}</div>
            <div style={{color: lightBlack}}> OT : {item.overtime_expect} hr.  </div>
            <div style={{color: lightBlack}}>Taxi Fare : {item.taxi_fare_total} BAHT</div>
            <div style={{color: lightBlack}}>{item.end_user_site}</div>
            <div style={{textAlign:'right', position:'absolute',right:4,bottom:22}}>
            </div>
          </Paper>
        </div>
      );
    });

    var elementSectionApprove =
    <Card style={{backgroundColor:'initial'}}>
      <CardHeader style={{padding:"20px 20px 0px 20px"}}
        title={"Request for Approve ("+this.state.requestTaxi.length+")"}
      />
      <CardText>
        <div style={styles.root}>
          <GridList cellHeight={120}
            cols={numberColumn}
            padding={10}
            style={styles.gridList}
          >

          {tableBody}
          </GridList>
        </div>
      </CardText>
    </Card>;

    return(
      <MuiThemeProvider>
        <div>
              <NavCompoment info={this.props.info} />
              <Drawer
                  docked={false} width={'50%'}
                  open={this.state.open}
                  openSecondary={this.state.openSecondary}
                  onRequestChange={(open) => this.setState({open})}
                >
                <ApproveServiceDetail tasks_sid={this.state.tasks_sid} data={this.state.data_detail} />
              </Drawer>

              {elementSectionApprove}

        </div>
      </MuiThemeProvider>
    )
  }

}

export default ApproveService;
