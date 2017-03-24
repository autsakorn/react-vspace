import React, { Component } from 'react';
// import logo from './logo.svg';
// import LeftBar from '../nav/LeftBar';
// import RightBar from '../nav/RightBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import MyApp from './MyApp';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  render(){
    var style = {
        container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '80px',
        bottom: 0
      },
      wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width:'100%',
        overflow:'auto'
      }
    }
    return(
      <MuiThemeProvider>
        <div className="color-5-0">
          <NavCompoment info={this.props.info} />
          <div id="vspace-container" style={style.container}>
            <div className="vspace-wrapper" style={style.wrapper}>
              <MyApp casetype={this.state.casetype} projectInfo={this.state.projectInfo} listType={this.state.listType} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
