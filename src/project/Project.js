import React, { Component } from 'react';
import get from '../config/Get.js';
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
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
      urlProject:this.props.urlProject,
      formData:this.props.formData,
      info:this.props.info,
      projectList:this.props.projectList,
      listProject:<div />,
      listAppoinement:<div />,
      selectedIndex:((localStorage.getItem("selectedIndex"))?parseInt(localStorage.getItem("selectedIndex")):0),
      appointment:[],
      showProject:1,
      showAppointment:1
    };

  }
  callProjectList(search){

    var that = this;
    this.props.formData.append("search",search);
    get(this.props.urlProject,this.props.formData).then(function(pl){
        that.setState({
          projectList:pl.data,appointment:pl.a
        });

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
    var that = this;
    var numberColumn = 5;
    if(window.innerWidth<376){
      numberColumn = 1;
    }
    var boxProject = [];
    that.state.projectList.forEach((tile,i) => {
      var avatarOwner = [];
      tile.owner.forEach((item,k) => {
          avatarOwner.push(<Avatar key={k} src={item.pic_full} />);
      });
      boxProject.push(
          <div
            key={i}
            style={styles.styleBorder} onTouchTap={that.handleSelectProject} data-id={tile.sid}
          >
            <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
              <div>{tile.name}</div>
              <div style={{color: lightBlack}}>{tile.contract}</div>
              <div style={{textAlign:'right', position:'absolute',right:4,bottom:22}}>
                {avatarOwner}
              </div>
            </Paper>
          </div>);
    });

    var elementSectionProject =
    <Card style={{backgroundColor:'initial'}}>
      <CardHeader style={{padding:"20px 20px 0px 20px"}}
        title={"Project ("+this.state.projectList.length+")"}
      />
      <CardText>
        <div style={styles.root}>
          <GridList cellHeight={120}
            cols={numberColumn}
            padding={10}
            style={styles.gridList}
          >
          <div onTouchTap={that.handleCreateNewProject}>
            <Paper zDepth={2}
              key={""}
              style={styles.styleBorderNew}
            >
              <div style={{padding:'10px',display:'flex'}}>
              <ContentAddCircle style={{marginTop:'6px', color:lightBlack}} /> <span style={{marginTop:'10px'}}>Create New Project</span></div>
            </Paper>
          </div>
          {boxProject}
          </GridList>
        </div>
      </CardText>
    </Card>;

    var box = [];
    that.state.appointment.forEach((item,i)=>{
      box.push(
        <div key={i+item.tasks_sid} onTouchTap={()=>this.handleSelectAppointment(item.tasks_sid)} style={styles.styleBorder} >
          <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
            <div>{item.subject}</div>
            <div style={{color: lightBlack}}><small>{item.end_user}</small></div>
            <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:4,bottom:22}}><small>{item.appointment}</small></div>
          </Paper>
        </div>
      );
    });
    var elementSectionAppointment =
    <Card style={{backgroundColor:'initial'}}>
      <CardHeader style={{padding:"20px 20px 0px 20px"}}
        title={"Appointment ("+that.state.appointment.length+")"}
        subtitle=""
      />
      <CardText>
        <div style={styles.root}>
          <GridList cellHeight={120}
            cols={numberColumn}
            padding={10}
            style={styles.gridList}
          >
            {box}
          </GridList>
        </div>
      </CardText>
    </Card>;

    that.setState({listProject:elementSectionProject,listAppoinement:elementSectionAppointment});

  }
  handleSelectProject(e){
    localStorage.setItem("project_sid", e.currentTarget.dataset.id);
    localStorage.removeItem("tasks_sid");
    location.reload();
  }
  handleSelectAppointment = (tasks_sid) => {
    // alert(tasks_sid);
    localStorage.setItem("tasks_sid",tasks_sid);
    localStorage.removeItem("project_sid");
    location.reload();
  }

  handleCreateNewProject = () => {
    localStorage.setItem("currectPage","ProjectCreate");
    location.reload();
  }
  select = (index) => {
    console.log(index);
    this.setState({selectedIndex: index});
    localStorage.setItem("selectedIndex",index);
    if(index===1){
      this.setState({showProject:1,showAppointment:0});
    }else if(index===2){
      this.setState({showProject:0,showAppointment:1});
    }else {
      this.setState({showProject:1,showAppointment:1});
    }
  }

  componentDidMount(){
    this.callProjectList("");
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

    return(
        <MuiThemeProvider style={{backgroundColor:'#eaeaea'}}>
          <div>
            <NavCompoment info={this.props.info} />
            <Paper zDepth={2} >
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                  <BottomNavigationItem
                    label="Boards"
                    icon={<ActionDashboard />}
                    onTouchTap={() => this.select(0)}
                  />
                  <BottomNavigationItem
                    label="Project"
                    icon={<ActionAssignment />}
                    onTouchTap={() => this.select(1)}
                  />
                  <BottomNavigationItem
                    label="Appointment"
                    icon={<ActionEvent />}
                    onTouchTap={() => this.select(2)}
                  />

                </BottomNavigation>
            </Paper>
            {showAppointment}
            {showProject}
          </div>
        </MuiThemeProvider>
    )
  }
}
export default Project;
