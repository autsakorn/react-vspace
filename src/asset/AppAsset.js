import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Columns, Column } from 're-bulma';
import Avatar from 'material-ui/Avatar';
import ActionStar from 'material-ui/svg-icons/action/grade';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import {
  socketConnect
} from 'socket.io-react';
import {Table, Thead,Tr,Th,Tbody,Td,Tfoot } from 're-bulma';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/save';

class AppAsset extends Component {
  constructor(props){
    super(props);
    this.state = {data:this.props.data, editing:false, id:"",
      model:"", specifications:"", serial:"",
      power:"",status:"",owner:"",duedate:""
    };
  }
  componentDidMount(){
      this.loadData();
  }
  loadData = () => {
    this.props.socket.emit('output');
    this.props.socket.on('output',res => {
        console.log(res);
        this.setState({data:res});
    });
  }
  handleEditing(_id, model, specifications, serial, power, status, owner, duedate){
    this.setState({editing:true,
      id:_id,
      model:model,
      specifications:specifications,
      serial:serial,
      power:power,
      status:status,
      owner:owner,
      duedate:duedate
    });
  }
  handleCancelEditing(){
    this.stateInitial();
  }
  changeModel = (e) => {
    this.setState({'model':e.target.value});
  }
  changeSpecifications = (e) => {
    this.setState({'specifications':e.target.value});
  }
  changeSerial = (e) => {
    this.setState({'serial':e.target.value});
  }
  changePower = (e) => {
    this.setState({'power':e.target.value});
  }
  changeStatus = (e) => {
    this.setState({'status':e.target.value});
  }
  changeOwner = (e) => {
    this.setState({'owner':e.target.value});
  }
  changeDueDate = (e) => {
    this.setState({'duedate':e.target.value});
  }
  handleUpdate = () => {
    this.props.socket.emit('update',
    {
      "_id":this.state.id,
      "model":this.state.model,
      "specifications":this.state.specifications,
      "serial":this.state.serial,
      "power":this.state.power,
      "status":this.state.status,
      "owner":this.state.owner,
      "duedate":this.state.duedate
    });
    this.stateInitial();
  }
  handleAddNew = () => {
    var data = {model:this.state.model, specifications:this.state.specifications, serial:this.state.serial, power:this.state.power,status:this.state.status,owner:this.state.owner,duedate:this.state.duedate};
    if(data.specifications!==""){
      this.props.socket.emit('input', data, function(res){
        console.log(res);
      });
    }
    this.stateInitial();
  }
  stateInitial = () => {
    this.setState({editing:false,
      id:"",
      model:"",
      specifications:"",
      serial:"",
      power:"",
      status:"",
      owner:"",
      duedate:""
    });
  }
  render(){
    var tableRow = [];
    const style = { column: {padding: '10px',overflow:'auto'},
    paper:{margin:'10px', overflow:'hidden'}
    ,textField:{width:'100%'},
    textFieldSpecifications:{width:'250px'} };
    if(this.state.data.length>0){
    this.state.data.forEach((item,i)=>{
        if(item._id!==this.state.id){
          tableRow.push(
            <Tr key={item._id} onTouchTap={()=>{this.handleEditing(item._id, item.model, item.specifications, item.serial, item.power, item.status, item.owner, item.duedate)}}>
              <Td>{i+1}</Td>
              <Td>{item.model}</Td>
              <Td>{item.specifications}</Td>
              <Td>{item.serial}</Td>
              <Td>{item.power}</Td>
              <Td>{item.status}</Td>
              <Td>{item.owner}</Td>
              <Td>{item.duedate}</Td>
            </Tr>
          );
        }else{
          tableRow.push(
            <Tr key={this.state.id}>
              <Td>{i+1}</Td>
              <Td><TextField style={style.textField} onChange={this.changeModel} value={this.state.model} hintText="Model" />
              </Td>
              <Td><TextField style={style.textFieldSpecifications} onChange={this.changeSpecifications} value={this.state.specifications} hintText="Specifications" /></Td>
              <Td><TextField style={style.textField} onChange={this.changeSerial} value={this.state.serial} hintText="Serial" /></Td>
              <Td><TextField style={style.textField} onChange={this.changePower} value={this.state.power} hintText="Power" /></Td>
              <Td><TextField style={style.textField} onChange={this.changeStatus} value={this.state.status} hintText="Status" /></Td>
              <Td><TextField style={style.textField} onChange={this.changeOwner} value={this.state.owner} hintText="Owner" /></Td>
              <Td><TextField style={style.textField} onChange={this.changeDueDate} value={this.state.duedate} hintText="Due Date" /></Td>
            </Tr>
          );
          tableRow.push(
            <Tr key={-2}>
              <Td></Td>
              <Td colspan="5">
                <IconButton onTouchTap={()=>{this.handleUpdate()}}><ContentSave /></IconButton>
                <IconButton onTouchTap={()=>{this.handleCancelEditing()}}><ContentClear /></IconButton>
              </Td>
              <Td>
              </Td>
            </Tr>
          )
        }
      });
    }else{
      tableRow.push(<Tr key={-1}><Td colSpan="8"><CircularProgress /></Td></Tr>);
    }

    var formAddNew;
    if(!this.state.editing){
      formAddNew = <Tbody>
        <Tr>
          <Td>#</Td>
          <Td>
            <TextField style={style.textField} hintText="Model" onChange={this.changeModel} value={this.state.model} />
            <RaisedButton onTouchTap={this.handleAddNew} label="Add" primary={true} />
          </Td>
          <Td><TextField style={style.textFieldSpecifications} hintText="Specifications" onChange={this.changeSpecifications} value={this.state.specifications} /></Td>
          <Td><TextField style={style.textField} hintText="Serial" onChange={this.changeSerial} value={this.state.serial} /></Td>
          <Td><TextField style={style.textField} hintText="Power" onChange={this.changePower} value={this.state.power} /></Td>
          <Td><TextField style={style.textField} hintText="Status" onChange={this.changeStatus} value={this.state.status} /></Td>
          <Td><TextField style={style.textField} hintText="Owner" onChange={this.changeOwner} value={this.state.owner} /></Td>
          <Td><TextField style={style.textField} hintText="Due Date" onChange={this.changeDueDate} value={this.state.duedate} /></Td>
        </Tr>
      </Tbody>
    }
    return (
      <div>
        <Paper zDepth={2} style={style.paper}>
          <Columns style={{marginTop:'0px'}}>
            <Column style={style.column}>
              <Table >
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Model</Th>
                    <Th>Specifications</Th>
                    <Th>Serial</Th>
                    <Th>Power</Th>
                    <Th>Status</Th>
                    <Th>Owner</Th>
                    <Th>Due Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableRow}
                </Tbody>
                {formAddNew}
              </Table>
            </Column>
          </Columns>
        </Paper>
      </div>
    );
  }
}

export default socketConnect(AppAsset);
