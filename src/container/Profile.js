import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import get from '../config/Get.js';
import Url from '../config/url';
import InfoGen from '../config/InfoGen';

class Profile extends Component {

  render(){
    var style = {
        container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '70px',
        bottom: 0
      },
      wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width:'100%',
        // overflow:'auto'
      }
    }
    return(
      <div>
        <MuiThemeProvider>
          <div >
            <NavCompoment info={this.props.info} />
            <div id="vspace-container" style={style.container}>
              <div className="vspace-wrapper" style={style.wrapper}>
                134
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Profile;
