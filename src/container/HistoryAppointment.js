import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ReactUploadFile from 'react-upload-file';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MediaQuery from 'react-responsive';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import SignatureCanvas from 'react-signature-canvas';
import Divider from 'material-ui/Divider';
import { Columns, Column } from 're-bulma';
// import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import DatePicker from 'material-ui/DatePicker';
import SocialPeople from 'material-ui/svg-icons/social/people';
import OwnerDialog from '../projectplan/OwnerDialog';
import Paper from 'material-ui/Paper';
import HistoryAppointmentItem from '../container/HistoryAppointmentItem';
import {GridList} from 'material-ui/GridList';
class HistoryAppointment extends Component {
  constructor(props){
    super(props);
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.props.my_staff.push({email:InfoGen.email,pic_employee:this.props.info.pic_full,thainame:this.props.info.thainame,engname:this.props.info.name});
    this.state = {
      info:this.props.info,minDate: minDate,
      maxDate: maxDate,
      my_staff:this.props.my_staff,
      email:InfoGen.email,
      pic_full:this.props.info.pic_full,
      thainame:'',
      engname:'',
      data:[]
    }
  }
  componentDidMount(){
    this.callDataFromServer();
  }
  callDataFromServer = () => {
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('staff',this.state.email);
    formData.append('start', moment(this.state.minDate).format('YYYY-MM-DD'));
    formData.append('end',  moment(this.state.maxDate).format('YYYY-MM-DD'));
    var that = this;
    get(Url.historyAppointment, formData).then(function(res){
      console.log(res);
      that.setState({data:res.data});
    });
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
    this.callDataFromServer();
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
    this.callDataFromServer();
  };

  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {
    this.setState({email:email, pic_full:pic_employee,thainame:thainame,engname:engname});
    var that = this;
    setTimeout(function () {
      that.callDataFromServer();
    }, 100);
  }
  handleSelectRequest = (tasks_sid) =>{
    this.getDataFromServer(tasks_sid);
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

  render(){

    var avatar;
    var picAvatar;
    if(this.state.pic_full){
      picAvatar = <Avatar src={this.state.pic_full} />
    }else{
      picAvatar = <Avatar>{this.state.email.toUpperCase().charAt(0)+''+this.state.email.toUpperCase().charAt(1)}</Avatar>
    }
    avatar = <div style={{float:'left'}}>{picAvatar}<small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}></small></div>;

    var numberColumn = 5;
    if(window.innerWidth<376){
      numberColumn = 1;
    }else if(window.innerWidth<768){
      numberColumn = 2;
    }

    // onTouchTap={
    //   ()=>{this.handleSelectRequest(item.sid)}
    // } data-id={item.sid}

    var tableBody = [];
    this.state.data.forEach((item, i) => {
      tableBody.push(
        <div
          key={i}
          style={styles.styleBorder}

        >
          <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
            <div>{item.subject_service_report}</div>
            <div>{item.end_user}</div>
            <div>Appointment <small style={{float:'right'}}>{item.appointment}</small></div>
            <div style={{color: lightBlack}}>{item.end_user_site}</div>
            <div><small style={{color:grey400}}>{item.no_task}</small></div>
            <div style={{textAlign:'right', position:'absolute',right:2,bottom:8}}>
            <div><small><a target="new" href={"http://vspace.in.th/pdf/"+item.path_service_report} >Service Report(PDF)</a></small></div>
            </div>
          </Paper>
        </div>
      );
    });

    var content;
    if(tableBody.length<1){
      content = <div>No Data</div>;
    }else{
      content = tableBody;
    }

    // <Chip style={styles.chip}>
    //   Taxi : {item.taxi_fare_total} BAHT.
    // </Chip>
    // <Chip style={styles.chip}>
    //   OT : {item.overtime_expect} hr.
    // </Chip>

    return(
      <MuiThemeProvider>
        <div>
            <NavCompoment info={this.props.info} />
            <Columns>
              <Column  style={styles.styleDatePickers}>
                <DatePicker
                    onChange={this.handleChangeMinDate}
                    floatingLabelText="Start Date"
                    defaultDate={this.state.minDate}
                    style={styles.styleDatePickers}
                    autoOk={true}
                    maxDate={this.state.maxDate}
                />
              </Column>
              <Column  style={styles.styleDatePickers}>
                <DatePicker
                    onChange={this.handleChangeMaxDate}
                    floatingLabelText="End Date"
                    defaultDate={this.state.maxDate}
                    minDate={this.state.minDate}
                    style={styles.styleDatePickers}
                    autoOk={true}
                />
              </Column>
              <Column>
                  <div style={{marginTop:'20px'}}>
                        {avatar}
                        <OwnerDialog onSelectItem={this.handleSelectItemOwner} onShowMore={()=>{}} listItem={this.props.my_staff} title={"Select"} label={"Select"} icon={<SocialPeople />} />
                  </div>
              </Column>
            </Columns>
            <div>
              <CardText>
                <div style={styles.root}>
                  <GridList cellHeight={120}
                    cols={numberColumn}
                    padding={10}
                    style={styles.gridList}
                  >

                  {content}
                  </GridList>
                </div>
              </CardText>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
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

  styleDatePickers: {
    marginLeft:'2%',
  },
  relative: {'position':'relative'},
};
export default HistoryAppointment
