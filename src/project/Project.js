import React, { Component } from 'react';
// import LeftBar from '../nav/LeftBar';
// import RightBar from '../nav/RightBar';
import get from '../config/Get.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
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
  render(){
    // var projectList = this.state.projectList.map((item,i)=>{
    //   return (
    //      <div className="section-item" key={i}>
    //       <span className="link section-tile color-2-0" onClick={this.handleSelectProject} data-id={item.sid}>
    //         <span className="tile-details">
    //           <span  dir="auto" className="tile-details">
    //             <div title={item.contract} className="tile-details-name">{item.contract}</div>
    //             <div ><small title={item.name}>{item.name}</small></div>
    //           </span>
    //         </span>
    //       </span>
    //     </div>
    //   )
    // });

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
        // backgroundColor: 'red'
      }
    };
    const GridListExampleSimple = () => (
      <Card>
        <CardHeader
          title="Project"
          subtitle="รายการโปรเจค"
        />
        <CardText>
          <div style={styles.root}>
            <GridList
              cols={5}
              padding={10}
              style={styles.gridList}
            >
              {this.state.projectList.map((tile,i) => (
                <GridTile
                  key={i}
                  title={tile.contract}
                  titleStyle={styles.titleStyle}
                  style={styles.styleBorder} onClick={this.handleSelectProject} data-id={tile.sid}
                >
                {tile.name}
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
