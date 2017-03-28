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
        border: '1px solid #838383',
        // margin:'10px 10px 0px 10px'
        // backgroundColor: 'red'
      },
      styleBorderNew: {
        border: '1px dashed #838383',
      }
    };
    var numberColumn = 5;
    console.log(window.innerWidth);
    if(window.innerWidth<376){
      numberColumn = 2;
    }
    const GridListExampleSimple = () => (
      <Card>
        <CardHeader
          title="Project"
          subtitle="รายการโปรเจค"
        />
        <CardText>
          <div style={styles.root}>
            <GridList
              cols={numberColumn}
              padding={10}
              style={styles.gridList}
            >
            <GridTile
              key={""}
              title={"Create New Project"}
              titleStyle={styles.titleStyle}
              style={styles.styleBorderNew} onClick={this.handleCreateNewProject}
            >
            <div style={{padding:'10px'}}>Create New Project</div>
            </GridTile>

              {this.state.projectList.map((tile,i) => (
                <GridTile
                  key={i}
                  title={tile.contract}
                  titleStyle={styles.titleStyle}
                  style={styles.styleBorder} onClick={this.handleSelectProject} data-id={tile.sid}
                >
                <div style={{padding:'10px'}}>{tile.name} <br/>{tile.create_datetime}</div>
                </GridTile>
              ))}
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
