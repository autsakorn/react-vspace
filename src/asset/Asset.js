import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
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
  SocketProvider
} from 'socket.io-react';
import io from 'socket.io-client';
import {Table, Thead,Tr,Th,Tbody,Td,Tfoot } from 're-bulma';
import AppAsset from '../asset/AppAsset';


export default class Asset extends Component {

  constructor(props){
    super(props);
    // const socket = ;
    this.state = {data:[],socket:io.connect("http://202.129.207.80:4000")}
  }
  componentDidMount(){
    // this.socket.on('message', msg => console.log(msg));
    this.state.data = [];
    // socket.on('output', res =>{
    //   console.log(res);
    //   this.data = res;
    // });
  }
  render(){
    console.log(this.state.socket);
    return(
      <SocketProvider socket={this.state.socket}>
        <AppAsset socket={this.state.socket} data={this.state.data} />
      </SocketProvider>
    )
  }
}
