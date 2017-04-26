import React, { Component } from 'react';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
// import IconButton from 'material-ui/IconButton';
// import Subheader from 'material-ui/Subheader';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
// import FlatButton from 'material-ui/FlatButton';
// import Paper from 'material-ui/Paper';
// import '../projectplan/App.css';
// import './Project.css';
import Avatar from 'material-ui/Avatar';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
// import Chip from 'material-ui/Chip';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
import TicketItem from '../ticket/TicketItem';
import TicketCreate from '../ticket/TicketCreate';
import Drawer from 'material-ui/Drawer';
class Project extends Component {
  constructor(props){
    var showProject,showAppointment,showTask;

    if(localStorage.getItem("selectedIndex")){
      if(localStorage.getItem("selectedIndex")==="1"){
        showProject = 1;
        showAppointment = 0;
        showTask = 0;
      }else if(localStorage.getItem("selectedIndex")==="2"){
        showProject = 0;
        showAppointment = 0;
        showTask = 1;
      }else if(localStorage.getItem("selectedIndex")==="3"){
        showProject = 0;
        showAppointment = 1;
        showTask = 0;
      }else{
        showProject = 1;
        showAppointment = 1;
        showTask = 1;
      }
    }else{
      showProject = 1;
      showAppointment = 1;
      showTask = 1;
    }

    var data_board = {data:[],a:[],t:[]};
    if(localStorage.getItem("data_board")){
      data_board = JSON.parse(localStorage.getItem("data_board"));
    }
    var listUserCanAddProject;
    if(localStorage.getItem("listUserCanAddProject")){
      listUserCanAddProject = JSON.parse(localStorage.getItem("listUserCanAddProject"));
    }else{
      listUserCanAddProject = [];
    }
    super(props);
    this.state = {
      search:'',
      urlProject:this.props.urlProject,
      formData:this.props.formData,
      info:this.props.info,
      projectList:data_board.data,
      listProject:<div />,
      listAppoinement:<div />,
      listTask:<div />,
      selectedIndex:((localStorage.getItem("selectedIndex"))?parseInt(localStorage.getItem("selectedIndex")):0),
      appointment:data_board.a,
      task:data_board.t,
      showProject:showProject,
      showAppointment:showAppointment,
      showTask:showTask,
      started:1,
      loader:0,
      listUserCanAddProject:listUserCanAddProject,
      openTicketDrawer:false,
      ticket_sid:((this.props.ticket_sid)?this.props.ticket_sid:null),
      data_ticket_detail:null
    };

  }
  componentDidMount(){
    this.generateBoxProject();
  }
  componentWillMount(){
    this.callProjectList("");
  }
  componentWillUnmount(){
    this.setState({projectList:[],appointment:[],task:[]});
  }
  callProjectList(search){
    var that = this;
    // this.props.formData.append("search",search);
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("search",this.state.search);
    get(this.props.urlProject,formData).then(function(pl){
        that.setState({
          projectList:pl.data,
          appointment:pl.a,
          task:pl.t,
          started:1,
          loader:1,
          listUserCanAddProject:pl.canAssignTo
        });
        localStorage.setItem('data_board',JSON.stringify(pl));
        localStorage.setItem('listUserCanAddProject',JSON.stringify(pl.canAssignTo));
        that.generateBoxProject();
    });
  }

  generateBoxProject(){
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
        height:180,
        borderRadius: '3px',
        // margin:'10px 10px 0px 10px'
        backgroundColor: '#fafbfc'
      },
      styleBorderNew: {
        border: '1px dashed #838383',
        height:180,
        borderRadius: '3px',
        backgroundColor:'#fff'
      }
    };
    var that = this;
    var numberColumn = 5;
    if(window.innerWidth<376){
      numberColumn = 1;
    }else if(window.innerWidth<768){
      numberColumn = 2;
    }

    var elementCreateProject =
    <div onTouchTap={that.handleCreateNewProject} key={0}>
      <Paper zDepth={2}
        key={""}
        style={styles.styleBorderNew}
      >
        <div style={{padding:'10px',display:'flex'}}>
        <ContentAddCircle style={{marginTop:'6px', color:lightBlack}} /> <span style={{marginTop:'10px'}}>Create New Project</span></div>
      </Paper>
    </div>;

    var boxProject = [];
    boxProject.push(elementCreateProject);
    that.state.projectList.forEach((tile,i) => {
      var avatarOwner = [];
      tile.owner.forEach((item,k) => {
          if(item.pic_full){
            avatarOwner.push(<Avatar key={item.email} src={item.pic_full} />);
          }else{
            avatarOwner.push(<Avatar style={{float:'right'}} key={item.email} >{item.email.toUpperCase().charAt(0)+item.email.toUpperCase().charAt(1)}</Avatar>);
          }
      });
      boxProject.push(
          <div
            key={i+"-"+tile.sid}
            style={styles.styleBorder} onTouchTap={that.handleSelectProject} data-id={tile.sid}
          >
            <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
              <div>{tile.name}</div>
              <div style={{color: lightBlack}}>{tile.contract}</div>
              <div style={{textAlign:'right', position:'absolute',right:8,bottom:8}}>
                {avatarOwner}
              </div>
            </Paper>
          </div>);
    });

    var elementSectionProject = <SectionElement title="Project" data={this.state.projectList} box={boxProject} numberColumn={numberColumn} styles={styles} />;

    var box = [];
    that.state.appointment.forEach((item,i)=>{
      box.push(
        <div key={i+item.tasks_sid} onTouchTap={()=>this.handleSelectAppointment(item.tasks_sid)} style={styles.styleBorder} >
          <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
            <div>{item.subject}</div>
            <div style={{color: lightBlack}}><small>{item.end_user}</small></div>
            <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:8,bottom:8}}><small>Appointment<br/>{item.appointment}</small></div>
          </Paper>
        </div>
      );
    });
    var elementSectionAppointment = <SectionElement title="Appointment" data={this.state.appointment} box={box} numberColumn={numberColumn} styles={styles}/>;


    var task = [];
    if(this.state.info.case_create_able==="1"){
      task.push(<TicketCreate listUserCanAddProject={this.state.listUserCanAddProject} key={"ticket-created"} />);
    }
    this.state.task.forEach((item,i)=>{
        task.push(
          <TicketItem item={item} listUserCanAddProject={this.state.listUserCanAddProject} key={item.sid+i} />
        )
    });

    var elementSectionTask =
    <div><SectionElement title="Task" data={this.state.task} box={task} numberColumn={numberColumn} styles={styles} />

    </div>;

    that.setState({listProject:elementSectionProject,listAppoinement:elementSectionAppointment,listTask:elementSectionTask});

  }
  handleSelectProject = (e) => {
    localStorage.setItem("project_sid", e.currentTarget.dataset.id);
    localStorage.removeItem("tasks_sid");
    // window.location.reload(true);
    this.props.onChangePage();
  }
  handleSelectAppointment = (tasks_sid) => {
    // alert(tasks_sid);
    localStorage.setItem("tasks_sid",tasks_sid);
    localStorage.removeItem("project_sid");
    // window.location.reload(true);
    this.props.onChangePage();
  }

  handleCreateNewProject = () => {
    // localStorage.setItem("currectPage","ProjectCreate");
    // window.location.reload(true);
    this.props.onChangePage("ProjectCreate");
  }
  select = (index) => {
    // console.log(index);
    this.setState({selectedIndex: index});
    localStorage.setItem("selectedIndex",index);
    this.setShow(index);
  }

  setShow = (index) => {
    if(index===1){
      this.setState({showProject:1,showTask:0,showAppointment:0});
    }else if(index===2){
      this.setState({showProject:0,showTask:1,showAppointment:0});
    }else if(index===3){
      this.setState({showProject:0,showTask:0,showAppointment:1});
    }else {
      this.setState({showProject:1,showTask:1,showAppointment:1});
    }
    this.callProjectList();
  }
  render(){
    var showAppointment;
    if(this.state.showAppointment){
      showAppointment =
        <div style={{'overflow':'auto','width':'100%','top':100,'bottom':'0'}}>
          {this.state.listAppoinement}
        </div>
    }
    var showProject;
    if(this.state.showProject){
      showProject =
      <div style={{'overflow':'auto','width':'100%','top':100,'bottom':'0'}}>
        {this.state.listProject}
      </div>
    }
    var showTask;
    if(this.state.showTask){
      showTask =
      <div style={{'overflow':'auto','width':'100%','top':100,'bottom':'0'}}>
        {this.state.listTask}
      </div>
    }
    var content;
    var loader;
    if(!this.state.loader){
      loader = <div style={{textAlign:'center'}}>
        <CircularProgress thickness={5} />
      </div>
    };

    if(this.state.started===1){
      content =
        <div>
          {loader}
          {showAppointment}
          {showTask}
          {showProject}
        </div>;
    }else{
      content = <div style={{textAlign:'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>;
    }
    var ticketDetail;
    if(this.state.openTicketDrawer){

    }else{
      ticketDetail = <div />;
    }
    return(
        <MuiThemeProvider style={{backgroundColor:'#eaeaea'}}>
          <div>
            <NavCompoment onChangePage={()=>{this.props.onChangePage()}} info={this.props.info} />
            <Paper zDepth={2} >
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                  <BottomNavigationItem
                    label={"Boards"}
                    icon={<ActionDashboard />}
                    onTouchTap={() => this.select(0)}
                  />
                  <BottomNavigationItem
                    label={"Project"}
                    icon={<ActionAssessment />}
                    onTouchTap={() => this.select(1)}
                  />
                  <BottomNavigationItem
                    label={"Task"}
                    icon={<ActionAssignment />}
                    onTouchTap={() => this.select(2)}
                  />
                  <BottomNavigationItem
                    label={"Appointment"}
                    icon={<ActionEvent />}
                    onTouchTap={() => this.select(3)}
                  />
                </BottomNavigation>
            </Paper>
            {content}
            {ticketDetail}
          </div>
        </MuiThemeProvider>
    )
  }
}

class SectionElement extends Component {
  render(){
    return(
      <Card style={{backgroundColor:'initial'}}>
        <CardHeader style={{padding:"20px 20px 0px 20px"}}
          title={this.props.title+" ("+this.props.data.length+")"}
          subtitle=""
        />
        <CardText>
          <div style={this.props.styles.root}>
            <GridList cellHeight={200}
              cols={this.props.numberColumn}
              padding={10}
              style={this.props.styles.gridList}
            >
                {this.props.box}
            </GridList>
          </div>
        </CardText>
      </Card>
    )
  }
}
export default Project;
