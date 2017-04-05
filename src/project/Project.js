import React, { Component } from 'react';
import get from '../config/Get.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
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
import Chip from 'material-ui/Chip';

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
    console.log(props);
    this.callProjectList("");
  }
  callProjectList(search){
    var that = this;
    this.props.formData.append("search",search);
    get(this.props.urlProject,this.props.formData).then(function(pl){
      that.setState({projectList:pl.data});
    });
  }
  handleSelectProject(e){
    localStorage.setItem("project_sid", e.currentTarget.dataset.id);
    location.reload();
  }
  handleCreateNewProject = () => {
    localStorage.setItem("currectPage","ProjectCreate");
    location.reload();
  }
  render(){
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
        overflowY: 'auto',
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
        borderRadius: '3px'
      }
    };
    var numberColumn = 5;
    console.log(window.innerWidth);
    if(window.innerWidth<376){
      numberColumn = 2;
    }

    var boxProject = [];
    this.state.projectList.forEach((tile,i) => {
      var avatarOwner = [];
      tile.owner.forEach((item,k) => {
          avatarOwner.push(<Avatar key={k} src={item.pic_full} />);
      });
      boxProject.push(
          <div
            key={i}
            style={styles.styleBorder} onClick={this.handleSelectProject} data-id={tile.sid}
          >
            <div style={{padding:'10px',height:'100%',position:'relative'}}>
              <div>{tile.name}</div>
              <div style={{color: lightBlack}}>{tile.contract}</div>
              <div style={{textAlign:'right', position:'absolute',right:4,bottom:22}}>
                {avatarOwner}
              </div>
            </div>
          </div>);
    });

    const GridListExampleSimple = () => (
      <Card>
        <CardHeader
          title="Project"
          subtitle="รายการโปรเจค"
        />
        <CardText>
          <div style={styles.root}>
            <GridList cellHeight={120}
              cols={numberColumn}
              padding={10}
              style={styles.gridList}
            >
            <div
              key={""}
              style={styles.styleBorderNew} onClick={this.handleCreateNewProject}
            >
              <div style={{padding:'10px',display:'flex'}}><ContentAddCircle style={{marginTop:'6px', color:lightBlack}} /> <span style={{marginTop:'10px'}}>Create New Project</span></div>
            </div>
            {boxProject}
            </GridList>
          </div>
        </CardText>
      </Card>
    );
    return(
        <MuiThemeProvider>
          <div>
            <NavCompoment info={this.props.info} />
            <div style={{'overflow':'auto','position':'absolute','width':'100%','top':60,'bottom':'0'}}>
              {GridListExampleSimple()}
            </div>
          </div>
        </MuiThemeProvider>
    )
  }
}
export default Project;
